<script setup lang="ts">
import { Loader } from "lucide-vue-next";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

setTimeout(async () => {
    await authStore.signOut();
    router.push({ name: "auth.login" });
}, 1500);
</script>

<template>
    <div class="flex flex-col space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">Sign Out</h1>
        <!-- CHANGE: Made description color contrast more readable -->
        <!-- CHANGE: Made the description describe what's happening -->
        <p class="text-sm text-gray-500">Signing you out, please wait a moment...</p>

        <div class="py-2">
            <Loader class="h-4 w-4 animate-spin" />
        </div>
    </div>
</template>
