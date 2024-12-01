<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// CHANGE: Centralize in one single getter
const userProfile = authStore.getProfile();
</script>

<template>
    <div class="flex flex-col space-y-2 p-12">
        <h1 class="text-2xl font-semibold tracking-tight">
            {{ userProfile.first_name }}
            {{ userProfile.last_name }}
        </h1>

        <p class="text-sm text-gray-400">
            {{ userProfile.email }}
        </p>
    </div>
</template>
