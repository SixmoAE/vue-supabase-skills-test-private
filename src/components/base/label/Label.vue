<script setup lang="ts">
import { Label, type LabelProps } from "radix-vue";

import { cn } from "@/lib/utils";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <Label
        v-bind="delegatedProps"
        :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
    >
        <slot />
    </Label>
</template>
