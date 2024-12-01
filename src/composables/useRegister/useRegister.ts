import { useToast } from "@/components/base/toast/use-toast";

import { useLoading } from "@/composables";
import { delay, getErrorMessage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import * as z from "zod";

export const useRegister = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    const { toast } = useToast();
    const { isLoading, toggleLoading } = useLoading();

    // Form validation schema
    const formSchema = toTypedSchema(
        z.object({
            firstName: z.string().min(1, {
                message: "First Name is required",
            }),
            lastName: z.string().min(1, {
                message: "Last Name is required",
            }),
            email: z
                .string()
                .min(1, {
                    message: "Email address is required",
                })
                .email({
                    message: "Email address is invalid",
                }),
            password: z
                .string()
                .min(1, {
                    message: "Password is required",
                })
                .min(6, {
                    message: "Password must be at least 6 characters",
                }),
        }),
    );

    // Form setup with VeeValidate
    const { handleSubmit } = useForm({
        validationSchema: formSchema,
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    // Use try catch block to handle even unexpected errors
    const submitForm = handleSubmit(async (payload: any) => {
        try {
            toggleLoading();

            const { error } = await authStore.signUpWithProfile(payload);

            await delay(500);

            if (error) throw error;

            router.push({ name: "panel.dashboard" });
            toast({
                title: "Welcome to your new account!",
                description: "You're all set up and ready to go.",
            });
        } catch (error: any) {
            console.error(error);
            // CHANGE: Made toast destructive to indicate an error
            // NOTE: Should have a more descriptive error message than "User already registered"
            // Better to specify what went wrong like "Can't register user with this email"
            toast({ title: "Unable to signup", description: getErrorMessage(error), variant: "destructive" });
        } finally {
            toggleLoading();
        }
    });

    return {
        submitForm,
        isLoading,
    };
};
