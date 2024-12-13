import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Showdown from 'showdown';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import { generateDocument } from '../routes/route';

// Type Definitions
type TemplateType = 'Contract' | 'Agreement' | 'Will' | 'Affidavit' | '';

interface FormInputs {
  prompt: string;
  template: TemplateType;
  contractType: string;
  agreementType: string;
  willType: string;
  affidavitType: string;
};

type ApiResponse = {
  code: string;
  error?: string;
};

// Main Component
const LegalDocumentGenerator: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPDFGenerated, setIsPDFGenerated] = useState<boolean>(false);
  const [isDocxGenerated, setIsDocxGenerated] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const converter = new Showdown.Converter();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormInputs>();

  // Remove Markdown from code
  const removeMarkdown = (text: string): string => {
    const start = text.indexOf("\`\`\`jsx");
    const end = text.lastIndexOf("\`\`\`");
    return start !== -1 && end > start ? text.slice(start + 6, end) : text;
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { prompt, template } = data;

    if (!prompt || !template) {
      setApiError("Prompt and template are required.");
      return;
    }

    const selectedType = data[`${template.toLowerCase()}Type` as keyof FormInputs];

    if (!selectedType) {
      setApiError(errors.message);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const response = await generateDocument({
        prompt,
        template,
        contractType: template === 'Contract' ? selectedType : undefined,
        agreementType: template === 'Agreement' ? selectedType : undefined,
        willType: template === 'Will' ? selectedType : undefined,
        affidavitType: template === 'Affidavit' ? selectedType : undefined,
      });
      setCode(removeMarkdown(response.code));
    } catch (error) {
      console.error("Error:", error);
      setApiError("An error occurred while generating the document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (): Promise<void> => {
    const element = document.getElementById("pdf-content");
    if (!element) {
      setApiError("Could not generate PDF. Please try again.");
      return;
    }

    const options = {
      margin: 1,
      filename: "legal_document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    try {
      await html2pdf().from(element).set(options).save();
      setIsPDFGenerated(true);
    } catch (error) {
      console.error("PDF generation error:", error);
      setApiError("Failed to generate PDF. Please try again.");
    }
  };

  const handleDownloadDocx = (): void => {
    if (!code) {
      setApiError("No content to generate DOCX. Please generate content first.");
      return;
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: code.split("\n").map(line => 
          new Paragraph({ children: [new TextRun(line)] })
        ),
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "legal_document.docx");
      setIsDocxGenerated(true);
    }).catch(error => {
      console.error("DOCX generation error:", error);
      setApiError("Failed to generate DOCX. Please try again.");
    });
  };

  const template = watch("template");

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="max-w-3xl p-6 mx-auto rounded-lg shadow-md bg-zinc-50">
        <h1 className="mb-4 text-2xl font-bold text-center text-zinc-800">
          Legal Document Generator
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-zinc-700">Enter description</label>
            <input
              id="prompt"
              {...register("prompt", { required: "Description is required" })}
              placeholder="Provide detailed information, including names, dates, conditions, and any relevant context..."
              className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-zinc-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.prompt && <p className="mt-2 text-sm text-red-600">{errors.prompt.message}</p>}
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-zinc-700">Choose Template</label>
            <select
              id="template"
              {...register("template", { required: "Template is required" })}
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base rounded-md border-zinc-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              onChange={(e) => {
                setValue("template", e.target.value as TemplateType);
                setValue("contractType", "");
                setValue("agreementType", "");
                setValue("willType", "");
                setValue("affidavitType", "");
              }}
            >
              <option value="">Choose Template</option>
              <option value="Contract">Contract</option>
              <option value="Agreement">Agreement</option>
              <option value="Will">Will</option>
              <option value="Affidavit">Affidavit</option>
            </select>
            {errors.template && <p className="mt-2 text-sm text-red-600">{errors.template.message}</p>}
          </div>

          {template === "Contract" && (
            <div>
              <label htmlFor="contractType" className="block text-sm font-medium text-zinc-700">Contract Type</label>
              <select
                id="contractType"
                {...register("contractType", { required: "Contract type is required" })}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base rounded-md border-zinc-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="">Select Contract Type</option>
                <option value="NDA">Non-Disclosure Agreement (NDA)</option>
                <option value="Employment">Employment Contract</option>
                <option value="Sales">Sales Contract</option>
                <option value="Lease">Lease Agreement</option>
                <option value="Service">Service Agreement</option>
                <option value="Partnership">Partnership Agreement</option>
                <option value="Purchase">Purchase Agreement</option>
              </select>
              {errors.contractType && <p className="mt-2 text-sm text-red-600">{errors.contractType.message}</p>}
            </div>
          )}

          {/* Similar blocks for Agreement, Will, and Affidavit types */}

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Generate
            </button>
          </div>
        </form>

        {apiError && (
          <div className="p-4 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
            {apiError}
          </div>
        )}

        {loading && (
          <div className="p-5 mt-6 space-y-4 font-serif border-2 rounded-md border-zinc-300">
            <div className="w-full h-5 rounded-md bg-zinc-200 animate-pulse"></div>
            <div className="w-3/4 h-5 rounded-md bg-zinc-200 animate-pulse"></div>
            <div className="w-1/2 h-5 rounded-md bg-zinc-200 animate-pulse"></div>
            <div className="w-1/2 h-5 rounded-md bg-zinc-200 animate-pulse"></div>
          </div>
        )}

        {!loading && code && (
          <div className="mt-6">
            <div
              id="pdf-content"
              dangerouslySetInnerHTML={{ __html: converter.makeHtml(code) }}
              className="p-6 font-serif text-justify bg-white border-2 rounded-md shadow-lg border-zinc-300"
            />

            <div className="mt-4 space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Download as PDF
              </button>

              <button
                onClick={handleDownloadDocx}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                Download as DOCX
              </button>
            </div>

            {isPDFGenerated && (
              <p className="mt-2 text-sm text-green-600">
                PDF Generated and Downloaded Successfully!
              </p>
            )}

            {isDocxGenerated && (
              <p className="mt-2 text-sm text-green-600">
                DOCX Generated and Downloaded Successfully!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalDocumentGenerator;