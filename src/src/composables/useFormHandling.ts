import { useToast } from "@/components/base/toast/use-toast";

import { ref } from "vue";

export interface FormState {
    isLoading: boolean;
    error: string | null;
}

export function useFormHandling() {
    const { toast } = useToast();
    const formState = ref<FormState>({
        isLoading: false,
        error: null,
    });

    const handleError = (error: any) => {
        toast({
            variant: "error",
            title: "Error",
            description: error.message,
        });
        formState.value.error = error.message;
    };

    const toggleLoading = () => {
        formState.value.isLoading = !formState.value.isLoading;
    };

    return {
        formState,
        handleError,
        toggleLoading,
    };
}
