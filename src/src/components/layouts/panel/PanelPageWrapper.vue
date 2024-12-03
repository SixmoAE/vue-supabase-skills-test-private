<script setup lang="ts">
import { Panel } from ".";

import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";

const authStore = useAuthStore();
const isInitializing = ref(true);

onMounted(async () => {
    await authStore.fetchProfile();
    isInitializing.value = false;
});
</script>

<template>
    <Panel v-if="!isInitializing">
        <RouterView />
    </Panel>
</template>
