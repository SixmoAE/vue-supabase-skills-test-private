import DashboardIndexPage from "./DashboardIndexPage.vue";

import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Vitest - 'DashboardIndexPage' component", () => {
    test("Properly renders", async () => {
        const wrapper = mount(DashboardIndexPage, {
            global: {
                plugins: [createTestingPinia({ stubActions: false })],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
