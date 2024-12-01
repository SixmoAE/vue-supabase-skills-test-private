import { useToast } from "@/components/base/toast/use-toast";

import { useLoading } from "@/composables";
import { delay, getErrorMessage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import * as z from "zod";

export const useLogin = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    const { toast } = useToast();
    const { isLoading, toggleLoading } = useLoading();

    const formSchema = toTypedSchema(
        z.object({
            email: z.string().min(1, "Email address is required").email("Email address is invalid"),
            password: z.string().min(1, "Password is required"),
        }),
    );

    const { handleSubmit } = useForm({
        validationSchema: formSchema,
        initialValues: { email: "", password: "" },
    });

    // Use try catch block to handle even unexpected errors
    const submitForm = handleSubmit(async (values) => {
        try {
            toggleLoading();

            const { error } = await authStore.signInWithPassword(values);
            await delay(500);

            if (error) throw error;

            router.push({ name: "panel.dashboard" });
            toast({
                title: "Login Successful",
                description: "Welcome back! You're now signed in.",
            });
        } catch (error: any) {
            // CHANGE: Made toast destructive for error messages
            console.error(error);
            toast({ title: "Unable to sign in", description: getErrorMessage(error), variant: "destructive" });
        } finally {
            toggleLoading();
        }
    });

    return { submitForm, isLoading };
};
