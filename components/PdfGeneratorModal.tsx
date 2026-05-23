"use client";

import { useState } from "react";
import { X, FileText, Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function PdfGeneratorModal({ 
  client, 
  onClose,
  adminId
}: { 
  client: any; 
  onClose: () => void;
  adminId?: string;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePreview = () => {
    // Open the hidden report route in a new tab for previewing
    window.open(`/report/${client.id}`, "_blank");
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.id, userId: adminId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      // Handle file download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `FINZAVIO-${client.name.replace(/\s+/g, '-')}-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
      setTimeout(() => onClose(), 2500); // Auto close after success
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl max-w-md w-full shadow-2xl relative flex flex-col gap-5 border border-neutral-200 dark:border-white/10">
        
        <button onClick={onClose} disabled={isGenerating} className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity disabled:opacity-20 z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-2">
          <div className="w-12 h-12 bg-[#191970]/10 text-[#191970] dark:bg-white/10 dark:text-white rounded-2xl flex items-center justify-center mb-1">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold dark:text-white tracking-tight">Generate Report</h2>
          <p className="text-[14px] text-neutral-500 leading-relaxed">
            Generate a premium multi-page financial assessment PDF for <span className="font-bold text-neutral-800 dark:text-neutral-200">{client.name}</span>.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-[13px] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[13px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>PDF downloaded successfully!</span>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <button 
            onClick={handlePreview} 
            disabled={isGenerating}
            className="w-full py-4 rounded-xl font-bold bg-[#F9FAFB] dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Eye className="w-4 h-4" /> Preview HTML Format
          </button>
          
          <button 
            onClick={handleDownload} 
            disabled={isGenerating || success}
            className="w-full py-4 rounded-xl font-bold bg-[#191970] text-white hover:bg-[#111150] transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-4 h-4" />}
            {isGenerating ? "Generating Engine..." : "Download PDF Report"}
          </button>
        </div>

      </div>
    </div>
  );
}

// Temporary icon to avoid import errors
function Eye(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}
