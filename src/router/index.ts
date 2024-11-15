import AuthRoutes from "./routes/auth/index";
import PanelRoutes from "./routes/panel/index";
import PublicRoutes from "./routes/public/index";
import SystemRoutes from "./routes/system/index";
import { useAuthStore } from "@/stores/auth";
import supabase from "@/supabase";
import type { User } from "@supabase/supabase-js";
import type { RouteLocation, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...AuthRoutes, ...PanelRoutes, ...PublicRoutes, ...SystemRoutes] as RouteRecordRaw[],
});

router.beforeResolve(async (to: RouteLocation) => {
    if (to.meta.auth) {
        const authStore = useAuthStore();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Store the user data.
        if (user) authStore.setUser(user as User);

        // Handle routes that block authenticated users.
        if (String(to.meta.auth) === "block") {
            if (user) return { name: "panel.dashboard" };
        }

        // Redirect unauthenticated users from protected routes.
        if (!user && to.name !== "auth.login" && to.name !== "auth.logout" && String(to.meta.auth) !== "block") {
            return { name: "auth.login" };
        }
    }

    return;
});

export default router;
