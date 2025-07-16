import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "./utils/clsx";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithRef<typeof DialogPrimitive.Close> & {
    onCloseIconClick?: (event: React.MouseEvent) => void;
  }
>(({ className, onCloseIconClick, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className
    )}
    {...props}
    onClick={(event: React.MouseEvent) => onCloseIconClick?.(event)}
  >
    <>
      <X className="w-5 h-5" />
      <span className="sr-only">Close</span>
    </>
  </DialogPrimitive.Close>
));

DialogClose.displayName = DialogPrimitive.Close.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background-mask-level2  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showOverlay?: boolean;
    overlayClassName?: string;
    preventInteractOutside?: boolean;
  }
>(
  (
    {
      className,
      children,
      showOverlay = true,
      overlayClassName,
      preventInteractOutside = false,
      ...props
    },
    ref
  ) => (
    <>
      {showOverlay && <DialogOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        onInteractOutside={(e) => preventInteractOutside && e.preventDefault()}
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-[512px] translate-x-[-50%] translate-y-[-50%] gap-4 bg-foreground-layer1 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl text-text-primary",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  children,
  showCloseIcon = true,
  onCloseIconClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseIcon?: boolean;
  onCloseIconClick?: (event: React.MouseEvent) => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-start mb-3 text-text-primary",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        {children}
        {showCloseIcon && <DialogClose onCloseIconClick={onCloseIconClick} />}
      </div>
    </div>
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-row justify-end mt-6 space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold tracking-tight leading-none",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
