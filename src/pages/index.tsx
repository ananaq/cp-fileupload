import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { FileUpload } from "@/components/FileUpload";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Upload, File, Image } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${inter.className} font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Navattic Take Home Task
          </h1>
          <p className="text-gray-600">
            By Viya Qu
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">New File Upload Component</h2>
          
          {/* Primary Upload Example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Primary Upload (Multiple Files)</h3>
            <FileUpload
              variant="primary"
              multiple
              maxFiles={3}
              maxSize={5 * 1024 * 1024}
              accept="image/*,application/pdf"
              label="Upload Files"
              description="Upload up to 3 files. Supported formats: Images and PDFs. Max size: 5MB per file."
              uploadText="Choose files to upload"
              dragText="or drag and drop files here"
              help="Files will be processed after upload"
              uploadIcon={<Upload className="w-6 h-6" />}
            />
          </div>

          {/* Inline Upload Example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Inline Upload (Single File)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                variant="inline"
                multiple={false}
                accept="image/*"
                label="Profile Picture"
                description="Upload your profile picture"
                uploadText="Choose image"
                help="JPG, PNG, or GIF format"
                uploadIcon={<Image className="w-5 h-5" />}
              />
              <FileUpload
                variant="inline"
                multiple={false}
                accept=".pdf,.doc,.docx"
                label="Resume"
                description="Upload your resume"
                uploadText="Choose file"
                help="PDF or Word document"
                uploadIcon={<File className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Demo Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/file-upload-demo">
              <Button variant="outline" className="w-full">
                View Complete Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
