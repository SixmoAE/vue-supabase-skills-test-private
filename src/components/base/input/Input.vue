<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { computed, type HTMLAttributes, ref } from "vue";

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
    type?: HTMLInputElement["type"];
}>();

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

// CHANGE: Added password visibility toggle
const isPasswordVisible = ref(false);
const inputType = computed(() => {
    if (props.type === "password") {
        return isPasswordVisible.value ? "text" : "password";
    }
    return props.type || "text";
});

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
    <div class="relative">
        <input
            :type="inputType"
            v-model="modelValue"
            v-bind="$attrs"
            :class="
                cn(
                    'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
                    props.class,
                )
            "
        />

        <!-- CHANGE: Added password visibility toggle button -->

        <button
            v-if="props.type === 'password'"
            tabindex="-1"
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
            <Eye v-if="!isPasswordVisible" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
        </button>
    </div>
</template>
