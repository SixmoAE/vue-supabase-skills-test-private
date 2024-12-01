export default [
    {
        path: "/auth",
        name: "auth",
        component: () => import("@/components/layouts/auth/AuthPageWrapper.vue"),
        redirect: { name: "auth.login" },
        meta: {
            auth: false,
            title: () => "Auth",
        },
        children: [
            {
                path: "/login",
                name: "auth.login",
                component: () => import("@/views/auth/login/LoginPage.vue"),
                meta: {
                    auth: "block",
                    title: () => "Login",
                },
            },
            {
                path: "/logout",
                name: "auth.logout",
                component: () => import("@/views/auth/logout/LogoutPage.vue"),
                meta: {
                    auth: true,
                    title: () => "Logout",
                },
            },
            {
                path: "/register",
                name: "auth.register",
                meta: {
                    auth: "block",
                    title: () => "Register",
                },
                component: () => import("@/views/auth/register/RegisterPage.vue"),
            },
            {
                path: "/forgot-password",
                name: "auth.forgot-password",
                meta: {
                    auth: "block",
                    title: () => "Forgot Password",
                },
                component: () => import("@/views/auth/forgot-password/ForgotPasswordPage.vue"),
            },
        ],
    },
];
