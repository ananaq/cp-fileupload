import { useState } from "react";
import { UploadedFile } from "@/components/FileUpload";
import { PrimaryFileUpload } from "@/components/PrimaryFileUpload";
import { SecondaryFileUpload } from "@/components/SecondaryFileUpload";
import { Inter } from "next/font/google";
import { Upload, File, Image, FileText } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function FileUploadDemo() {
  // const [primaryFiles, setPrimaryFiles] = useState<UploadedFile[]>([]);
  const [inlineFiles, setInlineFiles] = useState<UploadedFile[]>([]);
  // const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([]);
  const [newWorkflowFiles, setNewWorkflowFiles] = useState<UploadedFile[]>([]);
  // const [isUploading, setIsUploading] = useState(false);

  // const handleUpload = async (files: UploadedFile[]) => {
  //   setIsUploading(true);
    
  //   // Simulate upload process
  //   const uploadPromises = files.map(async (file) => {
  //     const updatedFile = { ...file, status: "uploading" as const };
      
  //     // Simulate network delay
  //     await new Promise(resolve => setTimeout(resolve, 2000));
      
  //     // Simulate success (90% chance)
  //     const success = Math.random() > 0.1;
  //     return {
  //       ...updatedFile,
  //       status: success ? "success" as const : "error" as const,
  //       error: success ? undefined : "Upload failed. Please try again.",
  //     };
  //   });

  //   const results = await Promise.all(uploadPromises);
  //   setIsUploading(false);
    
  //   return results;
  // };

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

        {/* New File Upload Workflow */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">New File Upload Workflow</h2>
          <p className="text-gray-600">
            This demonstrates the complete file upload workflow as designed in Figma:
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Primary button triggers modal with form fields</li>
            <li>Modal contains secondary file upload component</li>
            <li>File cards with hover states and floating remove buttons</li>
            <li>File preview grid with JPG, PNG, PDF support</li>
          </ul>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <PrimaryFileUpload
              value={newWorkflowFiles}
              onChange={setNewWorkflowFiles}
              accept="image/jpeg,image/png,application/pdf"
              maxFiles={10}
              maxSize={5 * 1024 * 1024} // 5MB
              multiple
              modalTitle="Product Details"
              showFormFields={true}
              label="Upload Files"
              description="Click to open the file upload modal"
            />
          </div>
        </section>


        {/* Secondary File Upload Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Secondary File Upload Component</h2>
          <p className="text-gray-600">
            This is the secondary file upload component used inside the modal:
          </p>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <SecondaryFileUpload
              value={inlineFiles}
              onChange={setInlineFiles}
              accept="image/jpeg,image/png,application/pdf"
              maxFiles={6}
              maxSize={5 * 1024 * 1024} // 5MB
              multiple
              label="Library"
              description="Upload your files here"
              uploadText="Upload Files"
            />
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Usage Examples</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-3">Primary File Upload with Modal</h3>
            <pre className="text-sm text-gray-600 bg-gray-50 p-4 rounded overflow-x-auto">
{`<PrimaryFileUpload
  value={files}
  onChange={setFiles}
  accept="image/jpeg,image/png,application/pdf"
  maxFiles={10}
  maxSize={5 * 1024 * 1024}
  multiple
  modalTitle="Product Details"
  showFormFields={true}
  label="Upload Files"
  description="Click to open the file upload modal"
/>`}
            </pre>
          </div>
        </section>

    
      </main>
    </div>
  );
}
