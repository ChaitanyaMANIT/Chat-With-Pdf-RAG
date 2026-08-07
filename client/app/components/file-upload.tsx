'use client';
import * as React from 'react';
import { FileText } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append('pdf', file);

          await fetch('http://localhost:8000/upload/pdf', {
            method: 'POST',
            body: formData,
          });
          console.log('File uploaded');
        }
      }
    });
    el.click();
  };

  return (
    <div
      onClick={handleFileUploadButtonClick}
      className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white shadow-2xl flex justify-center items-center p-8 rounded-lg border-2 border-dashed border-blue-400 transition-colors w-full"
    >
      <div className="flex justify-center items-center flex-col gap-3">
        <div className="bg-blue-600 p-3 rounded-full">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold">Upload PDF File</h3>
        <p className="text-sm text-slate-400 text-center">
          Click to browse or drag & drop your PDF here
        </p>
        <span className="text-xs text-blue-400">Supported: PDF</span>
      </div>
    </div>
  );
};

export default FileUploadComponent;