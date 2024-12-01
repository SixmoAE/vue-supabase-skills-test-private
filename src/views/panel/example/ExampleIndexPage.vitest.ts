import ExampleIndexPage from "./ExampleIndexPage.vue";

import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Vitest - 'ExampleIndexPage' component", () => {
    test("renders the page title correctly", () => {
        const wrapper = mount(ExampleIndexPage);

        const heading = wrapper.find("h1");
        expect(heading.exists()).toBe(true);
        expect(heading.text()).toBe("Example Page");
    });

    test("renders the subtitle paragraph", () => {
        const wrapper = mount(ExampleIndexPage);

        const subtitle = wrapper.find("p");
        expect(subtitle.exists()).toBe(true);
        expect(subtitle.text()).toBe("Lorem ipsum dolor sit amet.");
    });
});
