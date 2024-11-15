<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
    <div class="flex flex-col space-y-2 p-12">
        <h1 class="text-2xl font-semibold tracking-tight">
            {{ authStore.getProfile().first_name }}
            {{ authStore.getProfile().last_name }}
        </h1>

        <p class="text-sm text-gray-400">
            {{ authStore.getProfile().email }}
        </p>
    </div>
</template>
