/* Zod Schemas for form validation */

import * as zod from "zod";

export const loginFormSchema = zod.object({
    email: zod.string().email({ message: "invalid email" }),
    password: zod.string().min(6, "at least 6 characters"),
});

export type TLoginFormSchema = zod.infer<typeof loginFormSchema>;

export const registerFormSchema = zod
    .object({
        first_name: zod.string().min(1, "Required"),
        last_name: zod.string().min(1, "Required"),
        email: zod.string().email({ message: "invalid email" }),
        password: zod.string().min(6, "at least 6 characters"),
        confirm_password: zod.string(),
    })
    // checks if the password and confirm_password fields match
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export type TRegisterFormSchema = zod.infer<typeof registerFormSchema>;
