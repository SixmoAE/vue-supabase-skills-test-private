import DashboardIndexPage from "./DashboardIndexPage.vue";

import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

// Mock the auth store
vi.mock("@/stores/auth", () => ({
    useAuthStore: () => ({
        getProfile: () => ({
            first_name: "John",
            last_name: "Nolan",
            email: "admin@admin.com",
        }),
    }),
}));

describe("DashboardIndexPage", () => {
    test("displays user profile information", () => {
        const wrapper = mount(DashboardIndexPage);

        // Check if user information is displayed
        expect(wrapper.text()).toContain("John");
        expect(wrapper.text()).toContain("Nolan");
        expect(wrapper.text()).toContain("admin@admin.com");
    });
});
