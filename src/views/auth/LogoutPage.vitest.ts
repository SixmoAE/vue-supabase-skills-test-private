import LogoutPage from "./LogoutPage.vue";

import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Logout Page", () => {
    test("Signs Out and redirects to login", async () => {
        const wrapper = mount(LogoutPage, {
            global: {
                plugins: [router, createTestingPinia()],
            },
        });
        const authStore = useAuthStore();

        await router.isReady();

        expect(wrapper.exists()).toBe(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        expect(authStore.signOut).toHaveBeenCalledOnce();
        expect(router.currentRoute.value.name).toBe("auth.login");
    });
});
