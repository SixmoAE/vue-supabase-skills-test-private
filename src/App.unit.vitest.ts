import App from "./App.vue";

import router from "@/router";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Vitest - App component", () => {
    test("Properly renders", async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia({ stubActions: false })],
            },
        });

        await router.isReady();
        expect(wrapper.exists()).toBe(true);
    });
});
