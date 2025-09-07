"use client";

import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { Upload } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalCloseButton } from "./Modal";
import { SecondaryFileUpload } from "./SecondaryFileUpload";
import { type UploadedFile } from "./FilePreviewGrid";
import { Input } from "./Input";

export interface PrimaryFileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  // File handling
  value?: UploadedFile[];
  defaultValue?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  
  // Validation
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
  
  // UI Configuration
  disabled?: boolean;
  multiple?: boolean;
  
  // Labels and descriptions
  label?: string;
  description?: string;
  uploadText?: string;
  dragText?: string;
  
  // States
  isUploading?: boolean;
  error?: string;
  help?: string;
  
  // Modal configuration
  modalTitle?: string;
  showFormFields?: boolean;
  
  // Customization
  className?: string;
  "data-test-id"?: string;
}

const containerVariants = cva(
  [
    "relative flex flex-col gap-3 transition-all duration-200",
  ],
  {
    variants: {
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const dropZoneVariants = cva(
  [
    "relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer group",
    "hover:border-gray-400 hover:bg-gray-50",
    "focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
  ],
  {
    variants: {
      isDragActive: {
        true: "border-blue-500 bg-blue-50",
        false: "border-gray-300",
      },
      hasFiles: {
        true: "border-gray-200 bg-gray-50",
        false: "",
      },
      error: {
        true: "border-red-300 bg-red-50",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
  }
);

const fileIconVariants = cva(
  [
    "relative flex items-center justify-center",
  ],
  {
    variants: {
      size: {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const PrimaryFileUpload = React.forwardRef<HTMLDivElement, PrimaryFileUploadProps>(
  (
    {
      value = [],
      defaultValue = [],
      onChange,
      accept = "image/jpeg,image/png,application/pdf",
      maxFiles = 10,
      maxSize = 5 * 1024 * 1024, // 5MB
      minSize,
      disabled = false,
      multiple = true,
      label,
      description,
      uploadText = "Upload Files",
      dragText = "or drag and drop",
      isUploading = false,
      error,
      help,
      modalTitle = "Product Details",
      showFormFields = true,
      className,
      "data-test-id": dataTestId,
      ...props
    },
    ref
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFiles, setModalFiles] = useState<UploadedFile[]>(value);
    const [formData, setFormData] = useState({
      name: "",
      audience: "",
    });

    const files = value.length > 0 ? value : modalFiles;

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    const handleModalFilesChange = (newFiles: UploadedFile[]) => {
      setModalFiles(newFiles);
    };

    const handleFormSubmit = () => {
      // Update the main files with modal files
      onChange?.(modalFiles);
      setIsModalOpen(false);
    };

    const handleFormDataChange = (field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    };

    const getUploadText = () => {
      return files.length > 0 ? "Change files" : uploadText;
    };


    return (
      <>
        <div
          ref={ref}
          className={cn(
            containerVariants({ disabled }),
            className
          )}
          data-test-id={dataTestId}
          {...props}
        >
          <div
            className={cn(
              dropZoneVariants({
                isDragActive: false,
                hasFiles: files.length > 0,
                error: Boolean(error),
                disabled,
              })
            )}
            onClick={handleModalOpen}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Upload files${accept ? ` (${accept})` : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleModalOpen();
              }
            }}
          >
            {/* File icon with overlapping documents */}
            <div className={cn(fileIconVariants({ size: "md" }))}>
              {/* Background documents */}
              <div className="absolute -rotate-12 -translate-x-2 -translate-y-1">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl shadow-sm" />
              </div>
              <div className="absolute rotate-12 translate-x-2 -translate-y-1">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl shadow-sm" />
              </div>
              {/* Main document with upload icon */}
              <div className="relative z-10 w-16 h-16 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-600" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-2 items-center text-center max-w-md">
              <h3 className="text-lg font-semibold text-gray-900">
                Drag and drop files here
              </h3>
              <p className="text-sm text-gray-500">
                JPG, PNG, PDF (max.5MB)
              </p>
            </div>

            {/* Upload button */}
            <Button
              variant="solid"
              colorScheme="gray"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                handleModalOpen();
              }}
              iconLeft={<Upload className="w-4 h-4" />}
              isDisabled={disabled}
            >
              {getUploadText()}
            </Button>
          </div>

          {/* Error/Help text */}
          {(error || help) && (
            <div className={cn(
              "text-sm",
              error ? "text-red-600" : "text-gray-500"
            )}>
              {error || help}
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalContent className="max-w-4xl">
            <ModalHeader>
              <ModalTitle>{modalTitle}</ModalTitle>
              <ModalCloseButton />
            </ModalHeader>

            <div className="px-6 py-4 space-y-6">
              {showFormFields && (
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Name"
                      placeholder="Content"
                      value={formData.name}
                      onChange={(e) => handleFormDataChange("name", e.target.value)}
                      isRequired
                    />
                  </div>
                  <div>
                    <Input
                      label="Audience"
                      placeholder="Content"
                      value={formData.audience}
                      onChange={(e) => handleFormDataChange("audience", e.target.value)}
                      isRequired
                    />
                  </div>
                </div>
              )}

              <SecondaryFileUpload
                value={modalFiles}
                onChange={handleModalFilesChange}
                accept={accept}
                maxFiles={maxFiles}
                maxSize={maxSize}
                minSize={minSize || undefined}
                multiple={multiple}
                label="Library"
                description="Upload your files here"
                uploadText="Upload Files"
                disabled={disabled}
              />
            </div>

            <ModalFooter>
              <Button
                variant="ghost"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="gray"
                onClick={handleFormSubmit}
                isDisabled={modalFiles.length === 0}
              >
                {showFormFields ? "Create" : "Upload"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

PrimaryFileUpload.displayName = "PrimaryFileUpload";
