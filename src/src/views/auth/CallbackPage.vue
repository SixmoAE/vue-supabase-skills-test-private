<script setup lang="ts">
import { Loader } from "lucide-vue-next";

import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    const {
        data: { user },
    } = await authStore.getSession();
    if (user) {
        router.push({ name: "panel.dashboard" });
    } else {
        router.push({ name: "auth.login" });
    }
});
</script>

<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <Loader class="h-8 w-8 animate-spin" />
        <p class="text-sm text-gray-500">Authenticating...</p>
    </div>
</template>
