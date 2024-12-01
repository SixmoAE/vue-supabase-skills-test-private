import ExampleIndexPage from "./ExampleIndexPage.vue";

import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Vitest - 'ExampleIndexPage' component", () => {
    test("Properly renders", async () => {
        const wrapper = mount(ExampleIndexPage);
        expect(wrapper.exists()).toBe(true);
    });
});
