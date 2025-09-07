import { useState } from "react";
import { FileUpload, UploadedFile } from "@/components/FileUpload";
import { Button } from "@/components/Button";
import { Inter } from "next/font/google";
import { Upload, File, Image, FileText } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function FileUploadDemo() {
  const [primaryFiles, setPrimaryFiles] = useState<UploadedFile[]>([]);
  const [inlineFiles, setInlineFiles] = useState<UploadedFile[]>([]);
  const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: UploadedFile[]) => {
    setIsUploading(true);
    
    // Simulate upload process
    const uploadPromises = files.map(async (file) => {
      const updatedFile = { ...file, status: "uploading" as const };
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (90% chance)
      const success = Math.random() > 0.1;
      return {
        ...updatedFile,
        status: success ? "success" as const : "error" as const,
        error: success ? undefined : "Upload failed. Please try again.",
      };
    });

    const results = await Promise.all(uploadPromises);
    setIsUploading(false);
    
    return results;
  };

  return (
    <div
      className={`${inter.className} font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-50`}
    >
      <main className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            File Upload Component Demo
          </h1>
          <p className="text-gray-600">
            A comprehensive file upload component built with Navattic's design system
          </p>
        </div>

        {/* Primary Upload - Multiple Files */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Primary Upload (Multiple Files)</h2>
          <FileUpload
            variant="primary"
            size="lg"
            multiple
            maxFiles={5}
            maxSize={10 * 1024 * 1024} // 10MB
            accept="image/*,application/pdf,.doc,.docx"
            value={primaryFiles}
            onChange={setPrimaryFiles}
            label="Upload Documents"
            description="Upload up to 5 files. Supported formats: Images, PDF, Word documents. Max size: 10MB per file."
            uploadText="Choose files to upload"
            dragText="or drag and drop files here"
            isUploading={isUploading}
            help="Files will be processed after upload"
            uploadIcon={<Upload className="w-6 h-6" />}
          />
          
          {primaryFiles.length > 0 && (
            <div className="flex gap-3">
              <Button
                variant="solid"
                colorScheme="brand"
                onClick={() => handleUpload(primaryFiles)}
                isLoading={isUploading}
              >
                Upload Files
              </Button>
              <Button
                variant="outline"
                onClick={() => setPrimaryFiles([])}
              >
                Clear All
              </Button>
            </div>
          )}
        </section>

        {/* Inline Upload - Single File */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Inline Upload (Single File)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              variant="inline"
              multiple={false}
              accept=".csv,.xlsx,.xls"
              value={inlineFiles}
              onChange={setInlineFiles}
              label="Import Data"
              description="Upload a CSV or Excel file to import data"
              uploadText="Choose file"
              help="CSV and Excel files supported"
              uploadIcon={<FileText className="w-5 h-5" />}
            />
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">File Requirements</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CSV, XLSX, or XLS format</li>
                <li>• Maximum file size: 5MB</li>
                <li>• First row should contain headers</li>
                <li>• UTF-8 encoding recommended</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Logo Upload - Image Preview */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Logo Upload (Image Preview)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FileUpload
              variant="primary"
              multiple={false}
              accept="image/*"
              maxSize={2 * 1024 * 1024} // 2MB
              value={logoFiles}
              onChange={setLogoFiles}
              label="Company Logo"
              description="Upload your company logo. Recommended: SVG or PNG format, square aspect ratio."
              uploadText="Choose logo"
              dragText="or drag and drop logo here"
              help="SVG, PNG, or JPG format. Max size: 2MB"
              uploadIcon={<Image className="w-6 h-6" />}
            />
            
            {logoFiles.length > 0 && logoFiles[0].preview && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Preview</h3>
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src={logoFiles[0].preview}
                      alt="Logo preview"
                      className="max-w-32 max-h-32 object-contain"
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {logoFiles[0].file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(logoFiles[0].file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Error States */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Error States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              variant="inline"
              error="This file is too large. Please choose a file smaller than 1MB."
              label="Upload with Error"
              description="This demonstrates an error state"
              uploadIcon={<File className="w-5 h-5" />}
            />
            
            <FileUpload
              variant="inline"
              disabled
              label="Disabled Upload"
              description="This demonstrates a disabled state"
              uploadIcon={<File className="w-5 h-5" />}
            />
          </div>
        </section>

        {/* Different Sizes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Different Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FileUpload
              variant="inline"
              size="xs"
              label="Extra Small"
              uploadText="Choose file"
              uploadIcon={<File className="w-4 h-4" />}
            />
            <FileUpload
              variant="inline"
              size="sm"
              label="Small"
              uploadText="Choose file"
              uploadIcon={<File className="w-4 h-4" />}
            />
            <FileUpload
              variant="inline"
              size="md"
              label="Medium"
              uploadText="Choose file"
              uploadIcon={<File className="w-5 h-5" />}
            />
            <FileUpload
              variant="inline"
              size="lg"
              label="Large"
              uploadText="Choose file"
              uploadIcon={<File className="w-5 h-5" />}
            />
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Usage Examples</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-3">Basic Usage</h3>
            <pre className="text-sm text-gray-600 bg-gray-50 p-4 rounded overflow-x-auto">
{`<FileUpload
  variant="primary"
  multiple
  maxFiles={5}
  maxSize={10 * 1024 * 1024}
  accept="image/*,application/pdf"
  label="Upload Files"
  description="Upload up to 5 files"
  onChange={(files) => console.log(files)}
/>`}
            </pre>
          </div>
        </section>

        {/* API Documentation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">API Documentation</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-3">Props</h3>
            <div className="space-y-3 text-sm">
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">variant</code>
                <span className="text-gray-600 ml-2">"primary" | "inline" - Visual style of the upload area</span>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">multiple</code>
                <span className="text-gray-600 ml-2">boolean - Allow multiple file selection</span>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">maxFiles</code>
                <span className="text-gray-600 ml-2">number - Maximum number of files allowed</span>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">maxSize</code>
                <span className="text-gray-600 ml-2">number - Maximum file size in bytes</span>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">accept</code>
                <span className="text-gray-600 ml-2">string - Accepted file types (e.g., "image/*", ".pdf")</span>
              </div>
              <div>
                <code className="bg-gray-100 px-2 py-1 rounded">onChange</code>
                <span className="text-gray-600 ml-2">(files: UploadedFile[]) =&gt; void - Callback when files change</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
