import { registerData } from "./register.data";
import { expect, test } from "./register.fixtures";

test.describe("Playwright - Register Workflows", () => {
    test("User can register with unique user email", async ({ page, registerPage }) => {
        await registerPage.goto();

        const { email, password, firstName, lastName } = registerData.newUser;

        await registerPage.register(email, password, firstName, lastName);
        await expect(page).toHaveURL("/dashboard");
    });

    test("User cannot register with existing user email", async ({ registerPage }) => {
        await registerPage.goto();

        const { email, password, firstName, lastName } = registerData.existingUser;

        await registerPage.register(email, password, firstName, lastName);
        const toast = await registerPage.getExistingUserToast();
        await expect(toast).toBeVisible();
    });

    test("Empty fields should show validation errors", async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.register("", "", "", "");

        const firstNameError = await registerPage.getFirstNameError();
        const lastNameError = await registerPage.getLastNameError();
        const emailError = await registerPage.getEmailError();
        const passwordError = await registerPage.getPasswordError();

        await expect(firstNameError).toBeVisible();
        await expect(lastNameError).toBeVisible();
        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();
    });
});
