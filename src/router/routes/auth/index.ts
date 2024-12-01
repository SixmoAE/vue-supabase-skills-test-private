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
                component: () => import("@/views/auth/LoginPage.vue"),
                meta: {
                    auth: "block",
                    title: () => "Login",
                },
            },
            // new registration route
            {
                path: "/register",
                name: "auth.register",
                component: () => import("@/views/auth/RegisterPage.vue"),
                meta: {
                    auth: "block",
                    title: () => "Register",
                },
            },
            {
                path: "/logout",
                name: "auth.logout",
                component: () => import("@/views/auth/LogoutPage.vue"),
                meta: {
                    auth: true,
                    title: () => "Logout",
                },
            },
        ],
    },
];
