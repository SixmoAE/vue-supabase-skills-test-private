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
        <p class="text-sm text-gray-400">Please wait while we process your request.</p>

        <div class="py-2">
            <Loader class="h-4 w-4 animate-spin" />
        </div>
    </div>
</template>
