"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./Button";

const overlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
);

const contentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
);

const headerVariants = cva("flex flex-col space-y-1.5 text-center sm:text-left");

const footerVariants = cva("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2");

export interface ModalProps extends Dialog.DialogProps {
  children: React.ReactNode;
}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof contentVariants> {
  children: React.ReactNode;
}

export interface ModalHeaderProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof headerVariants> {
  children: React.ReactNode;
}

export interface ModalFooterProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof footerVariants> {
  children: React.ReactNode;
}

export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Title> {
  children: React.ReactNode;
}

export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Description> {
  children: React.ReactNode;
}

const Modal = Dialog.Root;

const ModalTrigger = Dialog.Trigger;

const ModalPortal = Dialog.Portal;

const ModalClose = Dialog.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(overlayVariants(), className)}
    {...props}
  />
));
ModalOverlay.displayName = Dialog.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Portal>
    <ModalOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        contentVariants(),
        "bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),0px_0px_16px_0px_rgba(0,0,0,0.02)] min-h-[500px] min-w-[1000px] w-[1000px]",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
));
ModalContent.displayName = Dialog.Content.displayName;

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        headerVariants(),
        "px-6 py-4 border-b border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        footerVariants(),
        "bg-gray-50 px-8 py-5 border-t border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  ModalTitleProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-900",
      className
    )}
    {...props}
  >
    {children}
  </Dialog.Title>
));
ModalTitle.displayName = Dialog.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  ModalDescriptionProps
>(({ className, children, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  >
    {children}
  </Dialog.Description>
));
ModalDescription.displayName = Dialog.Description.displayName;

const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <Dialog.Close asChild>
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        "flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  </Dialog.Close>
));
ModalCloseButton.displayName = "ModalCloseButton";

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
};
