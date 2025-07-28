"use client"

import { Toaster as Sonner } from "sonner";
import { MAX_VISIBLE_TOASTS, DEFAULT_CLOSE_BUTTON } from "../constants";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
      <Sonner
        className="toaster group"
        visibleToasts={MAX_VISIBLE_TOASTS}
        closeButton={DEFAULT_CLOSE_BUTTON}
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-[#383838] group-[.toaster]:text-white group-[.toaster]:shadow-lg group-[.toaster]:rounded-[16px] group-[.toaster]:h-12 group-[.toaster]:min-h-12 group-[.toaster]:max-h-12 group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:gap-3 group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:w-[343px] group-[.toaster]:mx-auto !border-divider-level3",
            actionButton:
              "group-[.toast]:!bg-[#383838] group-[.toast]:!text-[#8BAEFF] group-[.toast]:hover:!text-[#8BAEFF] group-[.toast]:hover:!bg-[#383838] group-[.toast]:!rounded-none group-[.toast]:!px-3 group-[.toast]:!py-1.5 group-[.toast]:!text-sm group-[.toast]:!font-medium group-[.toast]:!cursor-pointer group-[.toast]:!no-underline group-[.toast]:hover:!no-underline group-[.toast]:!shadow-none group-[.toast]:!outline-none group-[.toast]:!appearance-none group-[.toast]:!ml-auto",
            cancelButton:
              "group-[.toast]:bg-white/20 group-[.toast]:text-white group-[.toast]:hover:bg-white/30 group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-sm group-[.toast]:font-medium",
          },
        }}
        {...props}
      />
  );
};

export { Toaster }; 