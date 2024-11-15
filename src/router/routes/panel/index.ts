export default [
    {
        path: "/panel",
        name: "panel",
        component: () => import("@/components/layouts/panel/PanelPageWrapper.vue"),
        redirect: { name: "panel.dashboard" },
        children: [
            {
                path: "/dashboard",
                name: "panel.dashboard",
                component: () => import("@/views/panel/dashboard/DashboardIndexPage.vue"),
                meta: {
                    auth: "true",
                    title: () => "Dashboard",
                },
            },
            {
                path: "/example",
                name: "panel.example",
                component: () => import("@/views/panel/example/ExampleIndexPage.vue"),
                meta: {
                    auth: "true",
                    title: () => "Example",
                },
            },
        ],
    },
];
