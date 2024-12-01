import LoginPage from "./LoginPage.vue";

import AuthRoutes from "@/router/routes/auth";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { createMemoryHistory, createRouter, type RouteRecordRaw } from "vue-router";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [...AuthRoutes] as RouteRecordRaw[],
});

const pinia = createTestingPinia({
    createSpy: vi.fn,
});

describe("Login Page", () => {
    const wrapper = mount(LoginPage, {
        global: {
            plugins: [router, pinia],
        },
    });

    test("Login Form", async () => {
        await router.isReady();
        expect(wrapper.exists()).toBe(true);

        expect(wrapper.find("input[type=email]").exists()).toBe(true);
        expect(wrapper.find("input[type=password]").exists()).toBe(true);
        expect(wrapper.find("button[type=submit]").exists()).toBe(true);
    });
});
