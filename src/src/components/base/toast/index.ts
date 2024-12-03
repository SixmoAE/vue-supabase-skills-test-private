import { cva } from "class-variance-authority";

export { default as Toast } from "./Toast.vue";
export { default as ToastAction } from "./ToastAction.vue";
export { default as ToastClose } from "./ToastClose.vue";
export { default as ToastDescription } from "./ToastDescription.vue";
export { default as Toaster } from "./Toaster.vue";
export { default as ToastProvider } from "./ToastProvider.vue";
export { default as ToastTitle } from "./ToastTitle.vue";
export { default as ToastViewport } from "./ToastViewport.vue";
export { toast, useToast } from "./use-toast";

export const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-in fade-in-0 zoom-in-95 slide-in-from-top-full",
    {
        variants: {
            variant: {
                default: "bg-background border",
                success: "success-gradient border-green-200 text-green-900",
                error: "error-gradient border-red-200 text-red-900",
                warning: "warning-gradient border-yellow-200 text-yellow-900",
                info: "info-gradient border-blue-200 text-blue-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

// UX Reasoning for Adding Types to Toasts:
// Adding types to the toast component enhances the user experience by providing clear and consistent feedback to users.
// Different types of toasts (e.g., success, error, warning, info) allow users to quickly understand the nature of the message being displayed.
// This differentiation helps in conveying the urgency or importance of the message, improving the overall communication between the application and the user.
// For instance, a success toast can reassure users that their action was successful, while an error toast can alert them to issues that need attention.

export interface ToastProps {
    variant?: "default" | "success" | "error" | "warning" | "info";
    class?: string;
    duration?: number; // Duration in milliseconds
}
