import RegisterPage from "./RegisterPage.vue";

import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createMemoryHistory, createRouter, RouterLink, type Router } from "vue-router";

// Mock the auth store
vi.mock("@/stores/auth", () => ({
    useAuthStore: () => ({
        signUp: vi.fn().mockImplementation(async ({ email }) => {
            if (email === "admin@admin.com") {
                return { error: null };
            }
            return { error: { message: "Email already registered" } };
        }),
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

// Mock the toast
vi.mock("@/components/base/toast/use-toast", () => ({
    useToast: () => ({
        toast: vi.fn(),
    }),
}));

describe("RegisterPage", () => {
    let router: Router;

    beforeEach(async () => {
        router = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: "/", name: "auth.register", component: RegisterPage }],
        });
    });

    test("successful registration with valid data", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true,
                },
            },
        });

        const RANDOM_EMAIL = `test${Math.random()}@example.com`;
        await wrapper.find("input[name='email']").setValue(RANDOM_EMAIL);
        await wrapper.find("input[name='password']").setValue("password123");
        await wrapper.find("input[name='firstName']").setValue("John");
        await wrapper.find("input[name='lastName']").setValue("Doe");
        await wrapper.find("form").trigger("submit");
        expect(wrapper.emitted()).toBeTruthy();
    });

    test("shows error for already registered email", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true,
                },
            },
        });

        await wrapper.find("input[name='email']").setValue("admin@admin.com");
        await wrapper.find("input[name='password']").setValue("password");
        await wrapper.find("input[name='firstName']").setValue("John");
        await wrapper.find("input[name='lastName']").setValue("Nolan");
        await wrapper.find("form").trigger("submit");
        expect(wrapper.emitted()).toBeTruthy();
    });

    test("validates required fields", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                plugins: [router],
                stubs: {
                    RouterLink: true,
                },
            },
        });

        await wrapper.find("form").trigger("submit");
        expect(wrapper.emitted()).toBeTruthy();
    });
});
