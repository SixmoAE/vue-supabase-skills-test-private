import { useToast } from "@/components/base/toast/use-toast";

import { useAuthStore } from "@/stores/Auth";
import type { Tables } from "@/types/database/database.types";
import { SignUpValidation } from "@/validations";
import useVuelidate from "@vuelidate/core";
import { computed, type ComputedRef, type Ref, ref } from "vue";
import { useRouter } from "vue-router";
import type { IBaseValidation, IValidationData } from "vvalidation";

export const useSignUpPage = async () => {
    const router = useRouter();

    const { toast } = useToast();

    const loading: Ref<boolean> = ref<boolean>(false);

    const loginValidation: IBaseValidation = new SignUpValidation();

    const { rules, state }: IValidationData = await loginValidation.getData();

    const v$ = useVuelidate(await rules, await state);

    const onToggleLoading = () => (loading.value = !loading.value);

    const { signUp, createProfile } = useAuthStore();

    const onSubmitForm = async () => {
        const isValid: boolean = await v$.value.$validate();

        if (!isValid) {
            return false;
        }

        try {
            onToggleLoading();

            const { data }: any = await signUp({
                email: v$.value.email.$model,
                password: v$.value.password.$model,
                options: {
                    data: {
                        first_name: v$.value.first_name.$model,
                        last_name: v$.value.last_name.$model,
                    },
                },
            });

            if (data?.user?.id) {
                await createProfile({
                    id: data.user.id,
                    email: v$.value.email.$model,
                    first_name: v$.value.first_name.$model,
                    last_name: v$.value.last_name.$model,
                } as Tables<"profiles">);
            }

            router.push({ name: "panel.dashboard" });

            toast({ description: "Welcome Back!" });
        } catch (e: any) {
            toast({ description: e.message });
        } finally {
            onToggleLoading();
        }
    };

    // eslint-disable-next-line prettier/prettier
    const isAllowedToSubmit: ComputedRef<boolean> = computed<boolean>(() =>
        ["email", "password", "first_name", "last_name"].some((key) => !v$.value[key].$model),
    );

    return {
        v$,
        onSubmitForm,
        isAllowedToSubmit,
        loading,
    };
};
