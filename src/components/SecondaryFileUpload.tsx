"use client";

import React, { useCallback, useRef, useState, DragEvent, ChangeEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Upload, File, Image } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { FieldSet } from "./FieldSet";
import { FilePreviewGrid, type UploadedFile } from "./FilePreviewGrid";

export interface SecondaryFileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onDrop" | "defaultValue"> {
  // File handling
  value?: UploadedFile[];
  defaultValue?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  onDrop?: (files: File[]) => void;
  
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
  
  // States
  isUploading?: boolean;
  error?: string;
  help?: string;
  
  // Customization
  className?: string;
  "data-test-id"?: string;
}

const containerVariants = cva(
  [
    "relative flex flex-col gap-4 transition-all duration-200",
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

const uploadSectionVariants = cva(
  [
    "flex flex-col gap-4 p-4 border border-dashed border-gray-200 rounded-lg",
    "bg-white transition-all duration-200",
  ],
  {
    variants: {
      isDragActive: {
        true: "border-blue-500 bg-blue-50",
        false: "border-gray-200",
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

const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/")) return <Image className="w-4 h-4" />;
  if (file.type.includes("pdf")) return <File className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const validateFile = (
  file: File,
  accept?: string,
  maxSize?: number,
  minSize?: number
): string | null => {
  // Check file type
  if (accept && !file.type.match(accept.replace(/\*/g, ".*"))) {
    return `File type not allowed. Accepted types: ${accept}`;
  }

  // Check file size
  if (maxSize && file.size > maxSize) {
    return `File too large. Maximum size: ${formatFileSize(maxSize)}`;
  }

  if (minSize && file.size < minSize) {
    return `File too small. Minimum size: ${formatFileSize(minSize)}`;
  }

  return null;
};

export const SecondaryFileUpload = React.forwardRef<HTMLDivElement, SecondaryFileUploadProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      onDrop,
      accept = "image/jpeg,image/png,application/pdf",
      maxFiles = 10,
      maxSize = 5 * 1024 * 1024, // 5MB
      minSize,
      disabled = false,
      multiple = true,
      label = "Library",
      description,
      uploadText = "Upload Files",
      isUploading = false,
      error,
      help,
      className,
      "data-test-id": dataTestId,
      ...props
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(
      defaultValue.map((file) => ({ ...file, id: Math.random().toString(36) }))
    );
    const [isDragActive, setIsDragActive] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const files = value !== undefined ? value : internalFiles;

    const handleFiles = useCallback(
      (newFiles: File[]) => {
        const validatedFiles: UploadedFile[] = [];
        const errors: string[] = [];

        newFiles.forEach((file) => {
          const error = validateFile(file, accept, maxSize, minSize);
          if (error) {
            errors.push(`${file.name}: ${error}`);
          } else {
            const uploadedFile: UploadedFile = {
              id: Math.random().toString(36),
              file,
              status: "idle",
            };

            // Create preview for images
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                uploadedFile.preview = e.target?.result as string;
                setInternalFiles((prev) => [...prev]);
                onChange?.(files);
              };
              reader.readAsDataURL(file);
            }

            validatedFiles.push(uploadedFile);
          }
        });

        if (errors.length > 0) {
          console.warn("File validation errors:", errors);
        }

        if (validatedFiles.length > 0) {
          const updatedFiles = multiple
            ? [...files, ...validatedFiles].slice(0, maxFiles)
            : validatedFiles.slice(0, 1);

          if (value === undefined) {
            setInternalFiles(updatedFiles);
          }
          onChange?.(updatedFiles);
          onDrop?.(validatedFiles.map((f) => f.file));
        }
      },
      [files, accept, maxSize, minSize, multiple, maxFiles, onChange, onDrop, value]
    );

    const removeFile = useCallback(
      (fileId: string) => {
        const updatedFiles = files.filter((f) => f.id !== fileId);
        
        if (value === undefined) {
          setInternalFiles(updatedFiles);
        }
        onChange?.(updatedFiles);
      },
      [files, onChange, value]
    );

    const handleDragEnter = useCallback((e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => prev + 1);
      if (dragCounter === 0) {
        setIsDragActive(true);
      }
    }, [dragCounter]);

    const handleDragLeave = useCallback((e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => prev - 1);
      if (dragCounter <= 1) {
        setIsDragActive(false);
      }
    }, [dragCounter]);

    const handleDragOver = useCallback((e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        setDragCounter(0);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
      },
      [disabled, handleFiles]
    );

    const handleFileInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
        
        // Reset file input
        e.target.value = "";
      },
      [handleFiles]
    );

    const handleClick = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled]);

    return (
      <FieldSet
        label={label}
        description={description}
        state={error ? "error" : "default"}
        promptText={error || help}
        isDisabled={disabled}
        className={cn(
          containerVariants({ disabled }),
          className
        )}
      >
        <div
          ref={ref}
          className={cn(
            uploadSectionVariants({
              isDragActive,
              hasFiles: files.length > 0,
              error: Boolean(error),
              disabled,
            })
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-test-id={dataTestId}
          {...props}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
            className="sr-only"
            aria-hidden="true"
          />

          {/* Upload button and description */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="md"
              onClick={handleClick}
              isDisabled={disabled || isUploading}
              iconLeft={<Upload className="w-4 h-4" />}
              className="shrink-0"
            >
              {uploadText}
            </Button>
            
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Supported format: JPG, PNG, PDF
              </p>
            </div>
          </div>

          {/* File preview grid */}
          {files.length > 0 && (
            <FilePreviewGrid
              files={files}
              onRemoveFile={removeFile}
              variant="default"
              size="md"
              showRemoveButton={true}
            />
          )}

          {/* Drag overlay */}
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 rounded-lg pointer-events-none">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-700">Drop files here</p>
              </div>
            </div>
          )}
        </div>
      </FieldSet>
    );
  }
);

SecondaryFileUpload.displayName = "SecondaryFileUpload";
