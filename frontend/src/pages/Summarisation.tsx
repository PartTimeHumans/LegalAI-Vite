import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Upload, Download, AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Upload Document",
    description: "Select or drag & drop your legal document"
  },
  {
    title: "AI Processing",
    description: "Our AI analyzes and extracts key information"
  },
  {
    title: "Review Summary",
    description: "Get a concise summary of your document"
  }
];

const DocumentSummarizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setActiveStep(1);
      processDocument(selectedFile);
    }
  };

  const processDocument = async (selectedFile: File) => {
    setIsProcessing(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSummary(`CASE SUMMARY - ${selectedFile.name}

KEY POINTS:
1. Contract dispute between Tech Corp and Innovation Ltd
2. Breach of service agreement dated June 1, 2023
3. Damages claimed: $500,000

COURT'S DECISION:
- Partial summary judgment granted
- Tech Corp liable for breach of contract
- Damages reduced to $350,000

REASONING:
The court found substantial evidence of contract breach but determined that some claimed damages were speculative.

IMPLICATIONS:
1. Sets precedent for similar tech service agreements
2. Emphasizes importance of clear deliverable timelines
3. Highlights damage calculation methodology

NEXT STEPS:
- Appeal period: 30 days from judgment
- Payment schedule to be determined
- Parties to meet for settlement conference`);
    setIsProcessing(false);
    setActiveStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 space-x-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Document Summarizer</h1>
            <p className="text-gray-600">Transform lengthy documents into concise, actionable summaries</p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-4 mb-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border-2 ${
                activeStep === index 
                  ? 'border-primary bg-primary/5' 
                  : activeStep > index 
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-lg font-semibold ${
                  activeStep === index ? 'text-primary' : 'text-gray-900'
                }`}>
                  {step.title}
                </span>
                {activeStep > index && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Panel - Upload */}
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold">Upload Document</h2>
            <div className="p-8 text-center border-2 border-dashed rounded-lg border-primary/30">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="mb-4 text-gray-600">Drag and drop your document here or</p>
              <label className="px-4 py-2 text-white transition-colors rounded-lg cursor-pointer bg-primary hover:bg-primary-dark">
                Browse Files
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
              <p className="mt-4 text-sm text-gray-500">Supported formats: PDF, DOC, DOCX, TXT</p>
            </div>
            {file && (
              <div className="flex items-center justify-between p-4 mt-4 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-gray-700">{file.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>

          {/* Right Panel - Summary */}
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold">Document Summary</h2>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 rounded-full border-primary border-t-transparent animate-spin" />
                <p className="mt-4 text-gray-600">Analyzing document...</p>
              </div>
            ) : summary ? (
              <div className="space-y-4">
                <div className="p-4 overflow-y-auto font-mono text-sm rounded-lg bg-gray-50 max-h-64">
                  <pre className="whitespace-pre-wrap">{summary}</pre>
                </div>
                <button
                  onClick={() => {
                    const blob = new Blob([summary], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'summary.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
                >
                  <Download className="w-5 h-5" />
                  Download Summary
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <AlertCircle className="w-12 h-12 mb-2" />
                <p>Upload a document to see the summary</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSummarizer;
