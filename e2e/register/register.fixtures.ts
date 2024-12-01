import { createRegisterPage, RegisterPage } from "./register.page";
import { test as base } from "@playwright/test";

export * from "@playwright/test";

export const test = base.extend<{ registerPage: RegisterPage }>({
    registerPage: async ({ page }, use) => {
        const registerPage = createRegisterPage(page);
        await use(registerPage);
    },
});
