import App from "./App.vue";

import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: { template: "<div>Home</div>" } }],
});

describe("Vitest - App component", () => {
    test("Smoke test", async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router],
            },
        });

        await router.isReady();
        expect(wrapper.exists()).toBe(true);
    });
});
