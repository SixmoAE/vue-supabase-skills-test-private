import { Page } from "@playwright/test";

export const createLoginPage = (page: Page) => ({
    goto: async () => {
        await page.goto("/login");
    },

    login: async (email: string, password: string) => {
        await page.fill("input[name='email']", email);
        await page.fill("input[name='password']", password);
        await page.click("button[type='submit']");
    },

    getEmailError: async () => page.getByRole("alert").getByText("Email address is required"),

    getPasswordError: async () => page.getByRole("alert").getByText("Password is required"),

    getInvalidCredentialsToast: async () => page.locator("[description='Invalid login credentials']"),
});

export type LoginPage = ReturnType<typeof createLoginPage>;
