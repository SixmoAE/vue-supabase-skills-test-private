<script setup lang="ts">
import Toaster from "@/components/base/toast/Toaster.vue";

import supabase from "@/supabase";
import { onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

/**
 * Listen to Supabase's auth events
 * @docs https://supabase.com/docs/reference/javascript/auth-onauthstatechange
 */
const { data } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
        if (route.meta.auth) {
            router.push({ name: "auth.login" });
        }
    }
});

onBeforeUnmount(() => {
    data.subscription.unsubscribe();
});
</script>

<template>
    <Toaster />
    <router-view />
</template>
