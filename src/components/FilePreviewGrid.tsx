"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { FileCard } from "./FileCard";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
}

export interface FilePreviewGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  files: UploadedFile[];
  onRemoveFile?: (fileId: string) => void;
  maxFiles?: number;
  showRemoveButton?: boolean;
  "data-test-id"?: string;
}

const gridVariants = cva(
  "grid gap-3",
  {
    variants: {
      variant: {
        default: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        compact: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
        wide: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
      },
      size: {
        sm: "gap-2",
        md: "gap-3", 
        lg: "gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const emptyStateVariants = cva(
  [
    "flex flex-col items-center justify-center py-8 px-4 text-center",
    "border-2 border-dashed border-gray-200 rounded-lg",
    "text-gray-500",
  ],
  {
    variants: {
      variant: {
        default: "min-h-[120px]",
        compact: "min-h-[100px]",
        wide: "min-h-[140px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const FilePreviewGrid = React.forwardRef<HTMLDivElement, FilePreviewGridProps>(
  (
    {
      files,
      onRemoveFile,
      variant = "default",
      size = "md",
      showRemoveButton = true,
      className,
      "data-test-id": dataTestId,
      ...props
    },
    ref
  ) => {
    if (files.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(emptyStateVariants({ variant }), className)}
          data-test-id={dataTestId}
          {...props}
        >
          <div className="text-sm text-gray-500">
            No files uploaded yet
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(gridVariants({ variant, size }), className)}
        data-test-id={dataTestId}
        {...props}
      >
        {files.map((uploadedFile) => (
          <FileCard
            key={uploadedFile.id}
            file={{
              id: uploadedFile.id,
              name: uploadedFile.file.name,
              size: uploadedFile.file.size,
              type: uploadedFile.file.type,
              preview: uploadedFile.preview,
            }}
            onRemove={onRemoveFile}
            showRemoveButton={showRemoveButton}
            data-test-id={`file-card-${uploadedFile.id}`}
          />
        ))}
      </div>
    );
  }
);

FilePreviewGrid.displayName = "FilePreviewGrid";
