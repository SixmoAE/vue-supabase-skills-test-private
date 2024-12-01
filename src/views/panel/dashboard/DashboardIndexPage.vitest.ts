import DashboardIndexPage from "./DashboardIndexPage.vue";

import { useAuthStore } from "@/stores/auth";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// CHANGE: Created a new test suite for the 'DashboardIndexPage' component
// CHANGE: Added Pinia wrapper with mocked 'getProfile' method
describe("Vitest - 'DashboardIndexPage' component", () => {
    let wrapper: VueWrapper;
    let authStore: ReturnType<typeof useAuthStore>;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);

        authStore = useAuthStore();

        vi.spyOn(authStore, "getProfile").mockReturnValue({
            id: "1",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            deleted_at: null,
        });

        wrapper = mount(DashboardIndexPage, {
            global: {
                plugins: [pinia],
            },
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders user first name correctly", () => {
        expect(wrapper.text()).toContain("John");
    });

    test("renders user last name correctly", () => {
        expect(wrapper.text()).toContain("Doe");
    });

    test("renders user email correctly", () => {
        expect(wrapper.text()).toContain("john.doe@example.com");
    });

    test("calls 'getProfile' method", () => {
        expect(authStore.getProfile).toHaveBeenCalledTimes(1);
    });

    // For accessibility purposes
    test("has appropriate semantic structure", () => {
        const heading = wrapper.find("h1");
        const paragraph = wrapper.find("p");

        expect(heading.exists()).toBe(true);
        expect(paragraph.exists()).toBe(true);
    });
});
