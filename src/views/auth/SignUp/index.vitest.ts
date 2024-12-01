import { useToast } from "@/components/base/toast/use-toast";

import { useSignUpPage } from "./index.script";
import { useAuthStore } from "@/stores/Auth";
import useVuelidate from "@vuelidate/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useRouter } from "vue-router";

vi.mock("@/components/base/toast/use-toast", () => ({
    useToast: vi.fn(),
}));

vi.mock("@/stores/Auth", () => ({
    useAuthStore: vi.fn(),
}));

vi.mock("vue-router", () => ({
    useRouter: vi.fn(),
}));

vi.mock("@vuelidate/core", () => ({
    default: vi.fn(() => ({
        value: {
            $validate: vi.fn().mockReturnValueOnce(Promise.resolve(true)),
            $error: false,
            $dirty: false,
            email: {
                $model: ref("test@example.com"),
                $error: false,
                $dirty: false,
            },
            first_name: {
                $model: ref("John"),
                $error: false,
                $dirty: false,
            },
            last_name: {
                $model: ref("Doe"),
                $error: false,
                $dirty: false,
            },
        },
    })),
}));

describe("useSignUpPage", () => {
    const mockToast = vi.fn();
    const mockSignUp = vi.fn();
    const mockPush = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useToast as any).mockReturnValue({ toast: mockToast });
        (useAuthStore as any).mockReturnValue({
            signUp: mockSignUp,
        });
        (useRouter as any).mockReturnValue({
            push: mockPush,
        });
        (useVuelidate as any).mockReturnValue({
            value: {
                email: { $model: "test@example.com" },
                password: { $model: "password123" },
                first_name: { $model: "John" },
                last_name: { $model: "Doe" },
                $validate: vi.fn(() => Promise.resolve(true)),
            },
        });
    });

    it("calls signUp and createProfile on valid form submission", async () => {
        mockSignUp.mockResolvedValueOnce({ user: { id: "12345" } });

        const { onSubmitForm } = await useSignUpPage();

        await onSubmitForm();

        expect(mockSignUp).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            options: {
                data: {
                    first_name: "John",
                    last_name: "Doe",
                },
            },
        });

        expect(mockPush).toHaveBeenCalledWith({ name: "panel.dashboard" });
        expect(mockToast).toHaveBeenCalledWith({ description: "Welcome Back!" });
    });

    it("shows an error toast on signUp failure", async () => {
        mockSignUp.mockRejectedValueOnce(new Error("Sign-up failed"));

        const { onSubmitForm } = await useSignUpPage();

        await onSubmitForm();

        expect(mockToast).toHaveBeenCalledWith({ description: "Sign-up failed" });
    });

    it("validates the form before submission", async () => {
        const v$ = useVuelidate();
        (v$.value as any).$validate = vi.fn(() => Promise.resolve(false));

        const { onSubmitForm } = await useSignUpPage();

        const result = await onSubmitForm();

        expect(v$.value.$validate).toHaveBeenCalled();
        expect(result).toBe(false);
    });

    it("returns the correct computed properties", async () => {
        const { isAllowedToSubmit, loading } = await useSignUpPage();

        expect(isAllowedToSubmit.value).toBe(false);
        expect(loading.value).toBe(false);
    });
});
