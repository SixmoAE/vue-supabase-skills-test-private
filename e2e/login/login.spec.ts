import { loginData } from "./login.data";
import { expect, test } from "./login.fixtures";

test.describe("Playwright - Login Workflows", () => {
    test("User can login with valid credentials", async ({ page, loginPage }) => {
        await loginPage.goto();
        await loginPage.login(loginData.validUser.email, loginData.validUser.password);
        await expect(page).toHaveURL("/dashboard");
    });

    test("User cannot login with invalid credentials", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
        const toast = await loginPage.getInvalidCredentialsToast();
        await expect(toast).toBeVisible();
    });

    test("Empty email and password fields should show validation errors", async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login("", "");
        const emailError = await loginPage.getEmailError();
        const passwordError = await loginPage.getPasswordError();

        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();
    });
});
