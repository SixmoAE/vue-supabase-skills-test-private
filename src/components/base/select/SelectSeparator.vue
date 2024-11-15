<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from "radix-vue";

import { cn } from "@/lib/utils";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <SelectSeparator v-bind="delegatedProps" :class="cn('-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800', props.class)" />
</template>
