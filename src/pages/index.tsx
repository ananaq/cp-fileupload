import { Button } from "@/components/Button";
import { Inter } from "next/font/google";
import Link from "next/link";
import { File, Image } from "lucide-react";
import { PrimaryFileUpload } from "@/components/PrimaryFileUpload";

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
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Navattic Take Home Task
          </h1>
          <p className="text-gray-600">
            By Viya Qu
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/file-upload-demo">
              <Button variant="outline" className="w-full">
                View Complete Demo
              </Button>
            </Link>
          </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">File Upload Component</h2>
          {/* Primary Upload Example */}
          <div className="space-y-4">
            <PrimaryFileUpload
              multiple
              maxFiles={3}
              maxSize={5 * 1024 * 1024}
              accept="image/*,application/pdf"
              label="Upload Files"
              description="Upload up to 3 files. Supported formats: Images and PDFs. Max size: 5MB per file."
              uploadText="Choose files to upload"
              dragText="or drag and drop files here"
              help="Files will be processed after upload"
            />
          </div>

        </div>

        
        </div>
      </main>
    </div>
  );
}
