import { createLoginPage, LoginPage } from "./login.page";
import { test as base } from "@playwright/test";

export * from "@playwright/test";

export const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = createLoginPage(page);
        await use(loginPage);
    },
});
