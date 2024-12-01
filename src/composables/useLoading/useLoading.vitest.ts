import { useLoading } from "./useLoading";
import { describe, expect, it } from "vitest";

describe("Vitest - 'useLoading' composable", () => {
    it("should initialize isLoading to false", () => {
        const { isLoading } = useLoading();
        expect(isLoading.value).toBe(false);
    });

    it("should set isLoading to true when toggleLoading is called once", () => {
        const { isLoading, toggleLoading } = useLoading();
        toggleLoading();
        expect(isLoading.value).toBe(true);
    });

    it("should set isLoading back to false when toggleLoading is called twice", () => {
        const { isLoading, toggleLoading } = useLoading();
        toggleLoading(); // First call: true
        toggleLoading(); // Second call: false
        expect(isLoading.value).toBe(false);
    });
});
