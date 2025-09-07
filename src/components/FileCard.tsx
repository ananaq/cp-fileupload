"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

export interface FileCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileCardVariants> {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    preview?: string;
  };
  onRemove?: (fileId: string) => void;
  showRemoveButton?: boolean;
  "data-test-id"?: string;
}

const fileCardVariants = cva(
  [
    "relative aspect-[160/215] rounded-lg border border-gray-200 bg-cover bg-center bg-no-repeat transition-all duration-200 cursor-pointer group",
    "hover:shadow-md",
  ],
  {
    variants: {
      fileType: {
        jpg: "bg-gradient-to-br from-orange-100 to-red-100",
        png: "bg-gradient-to-br from-blue-100 to-purple-100", 
        pdf: "bg-gradient-to-br from-gray-100 to-gray-200",
        default: "bg-gradient-to-br from-gray-100 to-gray-200",
      },
      state: {
        default: "opacity-80",
        hover: "opacity-100",
      },
    },
    defaultVariants: {
      fileType: "default",
      state: "default",
    },
  }
);

const overlayVariants = cva(
  [
    "absolute inset-0 rounded-lg transition-all duration-200",
    "bg-black/0 group-hover:bg-black/60",
  ]
);

const contentVariants = cva(
  [
    "absolute inset-0 flex flex-col justify-between p-3 text-white transition-all duration-200",
    "opacity-0 group-hover:opacity-100",
  ]
);

const getFileType = (fileName: string, mimeType: string): "jpg" | "png" | "pdf" | "default" => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (extension === 'jpg' || extension === 'jpeg' || mimeType.includes('jpeg')) {
    return 'jpg';
  }
  if (extension === 'png' || mimeType.includes('png')) {
    return 'png';
  }
  if (extension === 'pdf' || mimeType.includes('pdf')) {
    return 'pdf';
  }
  return 'default';
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileExtension = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? `.${extension}` : '';
};

export const FileCard = React.forwardRef<HTMLDivElement, FileCardProps>(
  (
    {
      file,
      onRemove,
      showRemoveButton = true,
      className,
      "data-test-id": dataTestId,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const fileType = getFileType(file.name, file.type);
    const fileSize = formatFileSize(file.size);
    const fileExtension = getFileExtension(file.name);

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.(file.id);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          fileCardVariants({
            fileType,
            state: isHovered ? "hover" : "default",
          }),
          className
        )}
        style={{
          backgroundImage: file.preview ? `url(${file.preview})` : undefined,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-test-id={dataTestId}
        {...props}
      >
        {/* Background overlay for hover state */}
        <div className={cn(overlayVariants())} />
        
        {/* Hover content overlay */}
        <div className={cn(contentVariants())}>
          {/* Top section with file name */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="font-medium text-sm leading-tight line-clamp-2">
              {file.name.replace(/\.[^/.]+$/, "")}
            </div>
          </div>
          
          {/* Bottom section with file details */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-normal">{fileExtension}</span>
            <span className="font-normal">{fileSize}</span>
          </div>
        </div>

        {/* Floating remove button */}
        {showRemoveButton && (
          <Tooltip content={`Remove ${file.name}`}>
            <Button
              variant="ghost"
              size="xs"
              className={cn(
                "absolute -top-1 -right-1 h-6 w-6 rounded-lg bg-white shadow-sm",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "hover:bg-gray-50"
              )}
              onClick={handleRemove}
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-3 w-3 text-gray-700" />
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }
);

FileCard.displayName = "FileCard";
