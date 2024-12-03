<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const errorMessages: Record<string, { title: string; message: string }> = {
    "404": {
        title: "Page Not Found",
        message: "Sorry, we couldn't find the page you're looking for.",
    },
};

const errorType = route.params.error as string;
const error = errorMessages[errorType] || errorMessages["404"];
</script>

<template>
    <div class="flex h-screen w-full items-center justify-center text-center">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Error {{ errorType }} - {{ error.title }}</h1>
            <p class="text-sm text-gray-400">{{ error.message }}</p>
        </div>
    </div>
</template>
