<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const profile = authStore.getProfile();
</script>

<template>
    <div class="flex flex-col space-y-2 p-12">
        <h1 class="text-2xl font-semibold tracking-tight">
            {{ profile.first_name }}
            {{ profile.last_name }}
        </h1>

        <p class="text-sm text-gray-400">
            {{ profile.email }}
        </p>
    </div>
</template>
