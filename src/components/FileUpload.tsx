"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { 
  Upload, 
  File, 
  Image, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "../utils/cn";
import { NvSize } from "../utils/types";
import { FieldSet, FieldSetProps } from "./FieldSet";
import { Button } from "./Button";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
}

export interface FileUploadProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "onDrop" | "defaultValue"
  > {
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
  size?: NvSize;
  variant?: "primary" | "inline";
  multiple?: boolean;
  disabled?: boolean;
  
  // Labels and descriptions
  label?: FieldSetProps["label"];
  description?: FieldSetProps["description"];
  uploadText?: string;
  dragText?: string;
  
  // States
  isUploading?: boolean;
  error?: string;
  help?: string;
  
  // Customization
  uploadIcon?: ReactNode;
  className?: string;
  "data-test-id"?: string;
}

const containerVariants = cva(
  [
    "relative flex flex-col gap-3 transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        primary: "w-full",
        inline: "w-full max-w-md",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
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
      variant: {
        primary: "min-h-[200px]",
        inline: "min-h-[120px] py-4",
      },
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
    compoundVariants: [
      {
        variant: "primary",
        isDragActive: true,
        className: "min-h-[220px]",
      },
    ],
  }
);

const fileListVariants = cva(
  "flex flex-col gap-2",
  {
    variants: {
      variant: {
        primary: "mt-4",
        inline: "mt-3",
      },
    },
  }
);

const fileItemVariants = cva(
  [
    "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-200",
    "hover:border-gray-300 hover:shadow-sm",
  ],
  {
    variants: {
      status: {
        idle: "",
        uploading: "border-blue-200 bg-blue-50",
        success: "border-green-200 bg-green-50",
        error: "border-red-200 bg-red-50",
      },
    },
  }
);

const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/")) return <Image className="w-4 h-4" />;
  if (file.type.startsWith("video/")) return <File className="w-4 h-4" />;
  if (file.type.startsWith("audio/")) return <File className="w-4 h-4" />;
  if (file.type.includes("pdf")) return <File className="w-4 h-4" />;
  if (file.type.includes("text")) return <File className="w-4 h-4" />;
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

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      onDrop,
      accept,
      maxFiles = 10,
      maxSize,
      minSize,
      size = "md",
      variant = "primary",
      multiple = true,
      disabled = false,
      label,
      description,
      uploadText = "Choose file",
      dragText = "or drag and drop",
      isUploading = false,
      error,
      help,
      uploadIcon,
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
    const generatedId = useId();
    const uniqueId = props.id || generatedId;

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

    const getUploadText = () => {
      if (variant === "inline") {
        return files.length > 0 ? "Change file" : uploadText;
      }
      return uploadText;
    };

    const getDragText = () => {
      if (variant === "inline" || files.length > 0) {
        return "";
      }
      return dragText;
    };

    const defaultUploadIcon = <Upload className="w-6 h-6" />;

    return (
      <FieldSet
        label={label}
        description={description}
        state={error ? "error" : "default"}
        promptText={error || help}
        isDisabled={disabled}
        className={cn(
          containerVariants({ variant, disabled }),
          className
        )}
      >
        <div
          ref={ref}
          className={cn(
            dropZoneVariants({
              variant,
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
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Upload files${accept ? ` (${accept})` : ""}`}
          data-test-id={dataTestId}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
            className="sr-only"
            aria-hidden="true"
            id={uniqueId}
          />

          <AnimatePresence mode="wait">
            {files.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  {uploadIcon || defaultUploadIcon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-700">
                    {getUploadText()}
                  </p>
                  {getDragText() && (
                    <p className="text-xs text-gray-500">{getDragText()}</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="files-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="p-3 rounded-full bg-blue-100">
                  {uploadIcon || defaultUploadIcon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-700">
                    {files.length} file{files.length !== 1 ? "s" : ""} selected
                  </p>
                  <p className="text-xs text-gray-500">Click to change</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-blue-500/10 rounded-lg pointer-events-none"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-blue-700">Drop files here</p>
              </div>
            </motion.div>
          )}
        </div>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(fileListVariants({ variant }))}
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(fileItemVariants({ status: file.status }))}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-8 h-8 object-cover rounded border border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      {getFileIcon(file.file)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.file.size)}
                    </p>
                  </div>

                  {file.status === "uploading" && (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  )}
                  
                  {file.status === "success" && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  
                  {file.status === "error" && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  aria-label={`Remove ${file.file.name}`}
                >
                  <X className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </FieldSet>
    );
  }
);

FileUpload.displayName = "FileUpload";
