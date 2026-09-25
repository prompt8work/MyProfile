"use client";

import { Download } from "lucide-react";

export default function ExportPdfButton() {
  return (
    <div className="fixed top-4 right-4 z-50 no-print">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-plum-600 hover:bg-plum-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-semibold"
      >
        <Download className="w-5 h-5" />
        Export to PDF
      </button>
    </div>
  );
}
