<script lang="ts" setup>
import { useFormField } from "./useFormField";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

const { formDescriptionId } = useFormField();
</script>

<template>
    <p :id="formDescriptionId" :class="cn('text-sm text-slate-500 dark:text-slate-400', props.class)">
        <slot />
    </p>
</template>
