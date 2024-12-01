<script lang="ts" setup>
import { useId } from "radix-vue";

import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";
import { cn } from "@/lib/utils";
import { type HTMLAttributes, provide } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    errorMessages?: string[];
}>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
    <div :class="cn('space-y-1', props.class)">
        <slot />
        <div class="grid gap-1">
            <span v-for="message in errorMessages" :key="message" class="text-xs text-red-900">{{ message }}</span>
        </div>
    </div>
</template>
