import { useToast } from "@/components/base/toast/use-toast";

import { useAuthStore } from "@/stores/Auth";
import { LoginValidation } from "@/validations";
import { useVuelidate } from "@vuelidate/core";
import { computed, type ComputedRef, type Ref, ref } from "vue";
import { useRouter } from "vue-router";
import type { IBaseValidation, IValidationData } from "vvalidation";

export const useLoginPage = async () => {
    const router = useRouter();

    const { toast } = useToast();

    const loading: Ref<boolean> = ref<boolean>(false);

    const loginValidation: IBaseValidation = new LoginValidation();

    const { rules, state }: IValidationData = await loginValidation.getData();

    const v$ = useVuelidate(await rules, await state);

    const onToggleLoading = () => (loading.value = !loading.value);

    const { signInWithPassword } = useAuthStore();

    const onSubmitForm = async () => {
        const isValid: boolean = await v$.value.$validate();

        if (!isValid) {
            return false;
        }

        try {
            onToggleLoading();

            await signInWithPassword({
                email: v$.value.email.$model,
                password: v$.value.password.$model,
            });

            router.push({ name: "panel.dashboard" });

            toast({ description: "Welcome Back!" });
        } catch (e: any) {
            toast({ description: e.message });
        } finally {
            onToggleLoading();
        }
    };

    // eslint-disable-next-line prettier/prettier
    const isAllowedToSubmit: ComputedRef<boolean> = computed<boolean>(() => ["email", "password"].some((key) => !v$.value[key].$model));

    const onGoToSignUpPage = () => router.push({ name: "auth.signup" });

    return {
        v$,
        onSubmitForm,
        isAllowedToSubmit,
        onGoToSignUpPage,
        loading,
    };
};
