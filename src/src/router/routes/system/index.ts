export default [
    {
        path: "/error/:error",
        name: "system.error",
        component: () => import("@/views/system/ErrorPage.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "system.error", params: { error: 404 } },
    },
];
