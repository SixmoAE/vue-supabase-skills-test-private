import { Page } from "@playwright/test";

export const createRegisterPage = (page: Page) => ({
    goto: async () => {
        await page.goto("/register");
    },

    register: async (email: string, password: string, firstName: string, lastName: string) => {
        await page.fill("input[name='firstName']", firstName);
        await page.fill("input[name='lastName']", lastName);
        await page.fill("input[name='email']", email);
        await page.fill("input[name='password']", password);
        await page.click("button[type='submit']");
    },

    getEmailError: async () => page.getByRole("alert").getByText("Email address is required"),

    getPasswordError: async () => page.getByRole("alert").getByText("Password is required"),

    getFirstNameError: async () => page.getByRole("alert").getByText("First name is required"),

    getLastNameError: async () => page.getByRole("alert").getByText("Last name is required"),

    getExistingUserToast: async () => page.locator("[description='User already registered']"),
});

export type RegisterPage = ReturnType<typeof createRegisterPage>;
