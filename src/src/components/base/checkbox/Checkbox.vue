<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";

const props = withDefaults(
    defineProps<{
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
        required?: boolean;
        name?: string;
        id?: string;
        value?: string;
        class?: string;
    }>(),
    {
        checked: undefined,
        defaultChecked: false,
        disabled: false,
        required: false,
    },
);

const emit = defineEmits<{
    "update:checked": [value: boolean];
    change: [event: Event];
}>();

const model = useVModel(props, "checked", emit);

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    model.value = target.checked;
    emit("change", event);
};
</script>

<template>
    <input
        type="checkbox"
        :id="id"
        :name="name"
        :value="value"
        :checked="model"
        :required="required"
        :disabled="disabled"
        @change="handleChange"
        :class="
            cn(
                'peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900',
                props.class,
            )
        "
    />
</template>

<style scoped>
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    cursor: pointer;
}

input[type="checkbox"]:checked {
    background-color: rgb(15 23 42); /* slate-900 */
}

input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
    background-size: contain;
    background-repeat: no-repeat;
}

input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.dark input[type="checkbox"]:checked {
    background-color: rgb(248 250 252); /* slate-50 */
}

.dark input[type="checkbox"]:checked::after {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
}
</style>
