import Auth from "./Auth.vue";

import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// CHANGE: Added rendering tests for Auth layout
describe("Vitest - 'Auth' Component", () => {
    const defaultProps = {
        title: "Login",
        description: "Welcome back to our platform",
        showcaseImagePath: "/test-image.jpg",
    };

    test("renders component with provided props", () => {
        const wrapper = mount(Auth, {
            props: defaultProps,
            global: {
                stubs: {
                    RouterLink: true,
                    slot: true,
                },
            },
        });

        expect(wrapper.text()).toContain(defaultProps.title);
        expect(wrapper.text()).toContain(defaultProps.description);
    });

    test("renders showcase image when provided", () => {
        const wrapper = mount(Auth, {
            props: defaultProps,
            global: {
                stubs: {
                    RouterLink: true,
                    slot: true,
                },
            },
        });

        const image = wrapper.find("img[alt='']");
        expect(image.attributes("src")).toBe(defaultProps.showcaseImagePath);
    });

    test("renders logo in RouterLink", () => {
        const wrapper = mount(Auth, {
            props: defaultProps,
            global: {
                stubs: {
                    RouterLink: {
                        template: "<a><slot></slot></a>",
                    },
                },
            },
        });
        const logoImage = wrapper.find("img[src*='logo.svg']");
        expect(logoImage.exists()).toBe(true);
    });

    test("renders slot content", () => {
        const wrapper = mount(Auth, {
            props: defaultProps,
            slots: {
                default: "<div class='test-slot-content'>Slot Content</div>",
            },
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        expect(wrapper.find(".test-slot-content").text()).toBe("Slot Content");
    });

    test("works with undefined showcase image", () => {
        const wrapper = mount(Auth, {
            props: {
                ...defaultProps,
                showcaseImagePath: undefined,
            },
            global: {
                stubs: {
                    RouterLink: true,
                    slot: true,
                },
            },
        });

        expect(wrapper.exists()).toBe(true);
    });
});
