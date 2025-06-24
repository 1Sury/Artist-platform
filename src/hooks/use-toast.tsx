"use client";

import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant }: { title?: string; description?: string; variant?: "default" | "destructive" | "success" | "error" }) => {
      if (variant === "success") {
        sonnerToast.success(title, { description });
      } else if (variant === "error" || variant === "destructive") {
        sonnerToast.error(title, { description });
      } else {
        sonnerToast(title, { description });
      }
    },
    dismiss: () => {
      sonnerToast.dismiss();
    },
  };
}

export const toast = sonnerToast;