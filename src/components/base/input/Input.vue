<script setup lang="ts">
import { usePasswordField } from "@/composables";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { computed, type ComputedRef, type HTMLAttributes } from "vue";

const props = defineProps<{
    defaultValue?: string | number;
    type?: string;
    error?: boolean;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const isPasswordPropType: ComputedRef<boolean> = computed<boolean>(() => props.type === "password");

const { icon, type: inputType, toggleShow } = usePasswordField();
</script>

<template>
    <div class="relative">
        <input
            v-model="modelValue"
            :type="isPasswordPropType ? inputType : props.type"
            :class="[
                cn(
                    'flex h-9 w-full cursor-pointer rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:cursor-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
                    props.class,
                ),
                {
                    'pr-6': isPasswordPropType,
                    '!border-red-900': props.error,
                },
            ]"
            v-bind="$attrs"
        />
        <component
            v-if="isPasswordPropType"
            :is="icon"
            :class="['absolute right-1.5 top-1.5 cursor-pointer', { 'text-red-900': props.error }]"
            @click.stop="toggleShow"
        />
    </div>
</template>
