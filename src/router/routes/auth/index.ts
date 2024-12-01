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
                component: () => import("@/views/auth/Login/index.vue"),
                meta: {
                    auth: "block",
                    title: () => "Login",
                },
            },
            {
                path: "/signup",
                name: "auth.signup",
                component: () => import("@/views/auth/SignUp/index.vue"),
                meta: {
                    auth: "block",
                    title: () => "Sign Up",
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
