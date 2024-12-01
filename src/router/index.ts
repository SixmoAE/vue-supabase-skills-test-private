import AuthRoutes from "./routes/auth/index";
import PanelRoutes from "./routes/panel/index";
import PublicRoutes from "./routes/public/index";
import SystemRoutes from "./routes/system/index";
import { useAuthStore } from "@/stores/Auth";
import supabase from "@/supabase";
import type { User } from "@supabase/supabase-js";
import type { RouteLocation, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...AuthRoutes, ...PanelRoutes, ...PublicRoutes, ...SystemRoutes] as RouteRecordRaw[],
});

router.beforeResolve(async (to: RouteLocation) => {
    /**
     * ? Simplify Logic for Enhanced Readability
     * When writing JavaScript code, avoid deeply nested `if-else` structures. These can quickly become difficult to read and maintain, especially in complex logic. Instead, aim for clear and concise alternatives such as:
     * ? - Guard Clauses**: Handle edge cases upfront and exit early, keeping the main logic at the top level.
     * ? - Switch Statements: Use `switch` for handling multiple conditions with a common variable.
     * ? - Ternary Operators: For short and simple conditional assignments.
     * ? - Logical Operators: Utilize `&&` or `||` for concise checks and fallbacks.
     * ? - Functions: Break down complex logic into smaller, reusable functions for better structure.
     *
     * By reducing nesting, your code will not only look more elegant but also improve readability and maintainability for yourself and your team.
     *  */
    if (!to.meta.auth) {
        return;
    }

    const { setUser } = useAuthStore();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Store the user data.
    if (user) {
        setUser(user as User);
    }

    // Handle routes that block authenticated users.
    if (user && String(to.meta.auth) === "block") {
        return { name: "panel.dashboard" };
    }

    // Redirect unauthenticated users from protected routes.
    if (!user && to.name !== "auth.login" && to.name !== "auth.logout" && String(to.meta.auth) !== "block") {
        return { name: "auth.login" };
    }
});

export default router;
