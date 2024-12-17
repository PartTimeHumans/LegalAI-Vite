import React, { useState, useCallback, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Showdown from 'showdown';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, File, Loader, AlertCircle, CheckCircle, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

// Type Definitions
type DocumentType = 'Contract' | 'Agreement' | 'Will' | 'Affidavit' | 'Other';

interface FormInputs {
  prompt: string;
  documentType: DocumentType;
  numQuestions: number;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const generateQuestions = async (params: {
  prompt: string;
  documentType: DocumentType;
  numQuestions: number;
}): Promise<string> => {
  if (!params.prompt || !params.documentType || !params.numQuestions) {
    throw new Error('Prompt, document type, and number of questions are required');
  }

  const formattedPrompt = `Generate ${params.numQuestions} questions for a legal ${params.documentType.toLowerCase()} document with the following details:
    Type: ${params.documentType}
    Details: ${params.prompt}
    Please provide professional and legally relevant questions.`;

  try {
    const response = await axiosInstance.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{
        parts: [{
          text: formattedPrompt
        }]
      }],
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_ONLY_HIGH"
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH"
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const data: GeminiResponse = response.data;
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content.parts[0].text) {
      throw new Error('No valid response from the AI service');
    }
    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(`Failed to generate questions: ${error.response?.data?.error?.message || error.message}`);
    } else {
      console.error('Error generating questions:', error);
      throw error;
    }
  }
};

const LegalDocumentGenerator: React.FC = () => {
  const [questions, setQuestions] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generationStatus, setGenerationStatus] = useState<{
    pdf: boolean;
    docx: boolean;
  }>({ pdf: false, docx: false });
  const [apiError, setApiError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const converter = useMemo(() => new Showdown.Converter(), []);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormInputs>();

  const removeMarkdown = useCallback((text: string): string => {
    const start = text.indexOf("\`\`\`");
    const end = text.lastIndexOf("\`\`\`");
    return start !== -1 && end > start ? text.slice(start + 3, end).trim() : text;
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(async (data) => {
    const { prompt, documentType, numQuestions } = data;

    if (!prompt || !documentType || !numQuestions) {
      setApiError("Prompt, document type, and number of questions are required.");
      return;
    }

    setLoading(true);
    setApiError(null);
    setGenerationStatus({ pdf: false, docx: false });

    try {
      const response = await generateQuestions({
        prompt,
        documentType,
        numQuestions,
      });
      setQuestions(removeMarkdown(response));
    } catch (error) {
      console.error("Error:", error);
      setApiError(error instanceof Error ? error.message : "An error occurred while generating the questions.");
    } finally {
      setLoading(false);
    }
  }, [removeMarkdown]);

  const handleDownloadPDF = useCallback(async (): Promise<void> => {
    const element = document.getElementById("pdf-content");
    if (!element) {
      setApiError("Could not generate PDF. Please try again.");
      return;
    }

    const options = {
      margin: 1,
      filename: "legal_document_questions.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    try {
      await html2pdf().from(element).set(options).save();
      setGenerationStatus(prev => ({ ...prev, pdf: true }));
    } catch (error) {
      console.error("PDF generation error:", error);
      setApiError("Failed to generate PDF. Please try again.");
    }
  }, []);

  const handleDownloadDocx = useCallback((): void => {
    if (!questions) {
      setApiError("No content to generate DOCX. Please generate questions first.");
      return;
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: questions.split("\n").map(line => 
          new Paragraph({ children: [new TextRun(line)] })
        ),
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "legal_document_questions.docx");
      setGenerationStatus(prev => ({ ...prev, docx: true }));
    }).catch(error => {
      console.error("DOCX generation error:", error);
      setApiError("Failed to generate DOCX. Please try again.");
    });
  }, [questions]);

  const resetForm = useCallback(() => {
    setQuestions('');
    setApiError(null);
    setGenerationStatus({ pdf: false, docx: false });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary/10"
    >
      <motion.div 
        layout
        className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out 
          ${isExpanded ? 'w-full h-full' : 'w-[90%] h-[85vh]'}`}
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50"
        >
          <h2 className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <FileText className="w-6 h-6 text-primary" />
            <span>AI Legal Document Question Generator</span>
          </h2>
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)} 
              className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              {isExpanded ? 
                <Minimize2 className="w-5 h-5 text-gray-600" /> : 
                <Maximize2 className="w-5 h-5 text-gray-600" />
              }
            </motion.button>
            <motion.button 
              whileHover={{ rotate: 180 }}
              onClick={resetForm}
              className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <div className="p-6">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <motion.div layout>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                  Enter document details
                </label>
                <textarea
                  id="prompt"
                  {...register("prompt", { required: "Document details are required" })}
                  placeholder="Provide detailed information for the legal document, including names, dates, conditions, and any relevant context..."
                  className="block w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary min-h-[100px]"
                />
                {errors.prompt && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.prompt.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div layout>
                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
                  Choose Document Type
                </label>
                <select
                  id="documentType"
                  {...register("documentType", { required: "Document type is required" })}
                  className="block w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Document Type</option>
                  <option value="Contract">Contract</option>
                  <option value="Agreement">Agreement</option>
                  <option value="Will">Will</option>
                  <option value="Affidavit">Affidavit</option>
                  <option value="Other">Other</option>
                </select>
                {errors.documentType && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.documentType.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div layout>
                <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">
                  Number of Questions
                </label>
                <input
                  type="number"
                  id="numQuestions"
                  {...register("numQuestions", { 
                    required: "Number of questions is required",
                    min: { value: 1, message: "Minimum 1 question" },
                    max: { value: 20, message: "Maximum 20 questions" }
                  })}
                  className="block w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  min="1"
                  max="20"
                />
                {errors.numQuestions && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.numQuestions.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Generating...' : 'Generate Questions'}
              </motion.button>
            </motion.form>

            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center p-4 mt-4 space-x-2 text-red-700 bg-red-100 border border-red-400 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 mt-6 space-y-4 border-2 border-gray-200 rounded-lg"
              >
                <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-3/4 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-1/2 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </motion.div>
            )}

            <AnimatePresence>
              {!loading && questions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6"
                >
                  <div
                    id="pdf-content"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(questions) }}
                    className="p-6 bg-white border-2 border-gray-200 rounded-lg shadow-lg"
                  />

                  <div className="flex gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadPDF}
                      className="flex items-center justify-center flex-1 px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadDocx}
                      className="flex items-center justify-center flex-1 px-4 py-2 text-white transition-colors rounded-lg bg-secondary hover:bg-secondary/90"
                    >
                      <File className="w-5 h-5 mr-2" />
                      Download DOCX
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {(generationStatus.pdf || generationStatus.docx) && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center mt-4 space-x-2 text-green-600"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Questions generated successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(LegalDocumentGenerator);