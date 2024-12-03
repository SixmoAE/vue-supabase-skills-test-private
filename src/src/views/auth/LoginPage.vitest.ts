import DashboardIndexPage from "../panel/dashboard/DashboardIndexPage.vue";
import LoginPage from "./LoginPage.vue";
import RegisterPage from "./RegisterPage.vue";

import { type VueWrapper } from "@vue/test-utils";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createMemoryHistory, createRouter, type Router, RouterLink } from "vue-router";

// TypeScript interfaces for better type safety
interface AuthResponse {
    error: Error | null;
}

interface LoginPayload {
    email: string;
    password: string;
    options: {
        remember: boolean;
    };
}

interface Error {
    message: string;
}

// Mock function declarations with proper typing
const mockSignInWithPassword = vi.fn<[LoginPayload], Promise<AuthResponse>>();
const mockResetPassword = vi.fn<[string], Promise<AuthResponse>>();
const mockToast = vi.fn();

// Mock all required base components
vi.mock("@/components/base/button", () => ({
    Button: {
        name: "Button",
        template: "<button :disabled='disabled' :type='type' :class='variant'><slot /></button>",
        props: ["disabled", "type", "variant"],
    },
}));

vi.mock("@/components/base/form", () => ({
    Form: {
        name: "Form",
        template: "<form @submit.prevent=\"$emit('submit', $event)\"><slot /></form>",
    },
    FormField: {
        name: "FormField",
        template: "<div><slot :componentField='{}'/></div>",
    },
    FormItem: {
        name: "FormItem",
        template: "<div><slot /></div>",
    },
    FormLabel: {
        name: "FormLabel",
        template: "<label><slot /></label>",
    },
}));

vi.mock("@/components/base/input", () => ({
    Input: {
        name: "Input",
        props: ["modelValue", "disabled", "type", "required", "placeholder"],
        template: `
            <input
                :type="type"
                :value="modelValue"
                :disabled="disabled"
                :required="required"
                :placeholder="placeholder"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        `,
    },
}));

vi.mock("@/components/base/checkbox", () => ({
    Checkbox: {
        name: "Checkbox",
        props: ["checked", "disabled", "id"],
        template: `
            <input
                type="checkbox"
                :id="id"
                :checked="checked"
                :disabled="disabled"
                @change="$emit('update:checked', $event.target.checked)"
            />
        `,
    },
}));

// Mock the auth store
vi.mock("@/stores/auth", () => ({
    useAuthStore: () => ({
        signInWithPassword: mockSignInWithPassword,
        resetPassword: mockResetPassword,
    }),
}));

// Mock vue-router
vi.mock("vue-router", async (importOriginal) => {
    const actual = (await importOriginal()) as { RouterLink: typeof RouterLink };
    return {
        ...actual,
        useRouter: () => ({
            push: vi.fn(),
        }),
        RouterLink: actual.RouterLink,
    };
});

// Mock the toast notification system
vi.mock("@/components/base/toast/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

describe("LoginPage", () => {
    let router: Router;
    let wrapper: VueWrapper;

    // Setup before each test
    beforeEach(async () => {
        // Reset the Pinia store
        setActivePinia(createPinia());
        // Clear all mocks
        vi.clearAllMocks();

        // Create a new router instance
        router = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: "/", name: "auth.login", component: LoginPage },
                { path: "/register", name: "auth.register", component: { name: "RegisterPage" } },
                { path: "/dashboard", name: "panel.dashboard", component: { name: "DashboardIndexPage" } },
            ],
        });

        // Navigate to the login page
        await router.push("/");

        // Mount the component with all necessary plugins and stubs
        wrapper = mount(LoginPage, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true,
                },
            },
        });

        await flushPromises();
    });

    test("form validation shows appropriate error messages", async () => {
        // Submit empty form to trigger validation
        const form = wrapper.find("form");
        await form.trigger("submit.prevent");
        await wrapper.vm.$nextTick();

        // Check for required field errors
        const errorMessages = wrapper.findAll("p.text-sm.text-red-500");
        expect(errorMessages[0].text()).toBe("Email is required.");
        expect(errorMessages[1].text()).toBe("Password is required.");

        // Test invalid email format
        await wrapper.find("input[type='email']").setValue("invalid-email");
        await wrapper.vm.$nextTick();

        // Verify invalid email error
        expect(wrapper.find("p.text-sm.text-red-500").text()).toBe("Email is not valid.");
    });

    test("successful login with valid credentials", async () => {
        // Mock successful login response
        mockSignInWithPassword.mockResolvedValueOnce({ error: null });

        // Fill the form with valid data
        await wrapper.find("input[type='email']").setValue("admin@admin.com");
        await wrapper.find("input[type='password']").setValue("password");

        // Submit the form
        await wrapper.find("form").trigger("submit.prevent");
        await wrapper.vm.$nextTick();

        // Wait for async operations
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Verify auth store was called correctly
        expect(mockSignInWithPassword).toHaveBeenCalledWith({
            email: "admin@admin.com",
            password: "password",
            options: { remember: false },
        });

        // Verify successful form submission and toast
        expect(wrapper.emitted()).toBeTruthy();
        expect(mockToast).toHaveBeenCalledWith({
            variant: "success",
            title: "Success",
            description: "Welcome back!",
        });
    });

    test("handles login errors correctly", async () => {
        // Mock failed login response
        const errorMessage = "Invalid credentials";
        mockSignInWithPassword.mockResolvedValueOnce({
            error: { message: errorMessage },
        });

        // Fill and submit form
        await wrapper.find("input[type='email']").setValue("test@example.com");
        await wrapper.find("input[type='password']").setValue("wrongpass");
        await wrapper.find("form").trigger("submit.prevent");

        // Wait for async operations
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Verify error toast was shown
        expect(mockToast).toHaveBeenCalledWith({
            variant: "error",
            title: "Error",
            description: errorMessage,
        });
    });

    test("forgot password functionality", async () => {
        // Test without email first
        const forgotPasswordButton = wrapper.find("button.text-primary-600");
        await forgotPasswordButton.trigger("click");

        // Verify error message for missing email
        expect(mockToast).toHaveBeenCalledWith({
            variant: "error",
            title: "Error",
            description: "Please enter your email address",
        });

        // Mock successful password reset
        mockResetPassword.mockResolvedValueOnce({ error: null });

        // Test with valid email
        await wrapper.find("input[type='email']").setValue("test@example.com");
        await forgotPasswordButton.trigger("click");
        await flushPromises();

        // Verify reset password was called and success message shown
        expect(mockResetPassword).toHaveBeenCalledWith("test@example.com");
        expect(mockToast).toHaveBeenCalledWith({
            variant: "success",
            title: "Success",
            description: "Password reset instructions sent to your email",
        });
    });
});
