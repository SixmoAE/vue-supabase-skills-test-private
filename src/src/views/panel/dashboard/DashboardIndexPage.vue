<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <div>
            Welcome,
            {{ authStore.getProfile()?.first_name }}
            {{ authStore.getProfile()?.last_name }}
        </div>

        <div>
            Email:
            {{ authStore.getProfile()?.email }}
        </div>
    </div>
</template>
