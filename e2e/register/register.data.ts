import { generateUniqueEmail } from "../shared/utils";

export const registerData = {
    newUser: {
        firstName: "John",
        lastName: "Doe",
        email: generateUniqueEmail(),
        password: "password",
    },
    existingUser: {
        firstName: "John",
        lastName: "Doe",
        email: "admin@admin.com",
        password: "password",
    },
};
