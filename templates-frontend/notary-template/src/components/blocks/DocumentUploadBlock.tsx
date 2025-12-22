import React, { useState } from 'react';
import type { DocumentUploadBlock as DocumentUploadBlockType } from '../../types/wagtail';
import { Upload, File, CheckCircle, AlertCircle, Shield, Lock } from 'lucide-react';

interface DocumentUploadBlockProps {
  block: DocumentUploadBlockType;
}

export const DocumentUploadBlock: React.FC<DocumentUploadBlockProps> = ({ block }) => {
  const { value } = block;
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-2xl mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Secure Document Upload
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {value.instructions}
          </p>
        </div>

        <div
          className={`relative border-4 border-dashed rounded-3xl p-16 text-center transition-all ${
            dragActive
              ? 'border-theme-primary bg-theme-primary/5 scale-105'
              : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-theme-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleChange}
            accept={value.allowed_file_types.join(',')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="pointer-events-none">
            <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10 rounded-2xl mb-6">
              <Upload className="w-16 h-16 text-theme-primary" />
            </div>

            <h3 className="text-3xl font-black text-gray-900 mb-3">
              Drop files here or click to browse
            </h3>

            <p className="text-gray-600 mb-4 text-lg">
              Accepted formats: <span className="font-bold text-theme-primary">{value.allowed_file_types.join(', ')}</span>
            </p>

            <p className="text-sm text-gray-500">
              Maximum file size: <span className="font-bold">{value.max_file_size}MB</span>
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-all">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <File className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        )}

        {value.require_before_booking && (
          <div className="mt-8 flex items-start gap-4 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200">
            <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <p className="text-gray-900 font-semibold text-lg">
              Document upload is required before booking your appointment
            </p>
          </div>
        )}

        {value.privacy_notice && (
          <div className="mt-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-theme-primary" />
              <h4 className="font-black text-gray-900 text-xl">Privacy & Security</h4>
            </div>
            <p className="text-gray-700 leading-relaxed">{value.privacy_notice}</p>
          </div>
        )}

        <button className="w-full mt-8 px-10 py-6 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-2xl font-black text-xl hover:shadow-2xl transition-all hover:scale-105">
          Upload Documents Securely
        </button>
      </div>
    </section>
  );
};
