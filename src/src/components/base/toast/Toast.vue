<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from "radix-vue";
import { type ToastProps, toastVariants } from ".";

import { toastIcons } from "./icons";
import { cn } from "@/lib/utils";
import { computed, onMounted, ref } from "vue";

const props = withDefaults(defineProps<ToastProps>(), {
    duration: 5000, // Default 5 seconds
});

const emits = defineEmits<ToastRootEmits>();
const isVisible = ref(true);
const progressWidth = ref(100);

const icon = computed(() => (props.variant ? toastIcons[props.variant] : null));

const delegatedProps = computed(() => {
    const { ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

onMounted(() => {
    // Start progress bar animation
    const startTime = Date.now();
    const animate = () => {
        const elapsed = Date.now() - startTime;
        progressWidth.value = Math.max(0, 100 - (elapsed / props.duration) * 100);

        if (elapsed < props.duration) {
            requestAnimationFrame(animate);
        } else {
            isVisible.value = false;
            emits("update:open", false);
        }
    };

    requestAnimationFrame(animate);
});
</script>

<template>
    <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <ToastRoot
            v-if="isVisible"
            v-bind="forwarded"
            :class="cn(toastVariants({ variant }), props.class)"
            @update:open="onOpenChange"
        >
            <div class="flex w-full items-center gap-3">
                <component v-if="icon" :is="icon" class="h-5 w-5 flex-shrink-0" />
                <div class="flex-grow">
                    <slot />
                </div>
            </div>
            <!-- Progress bar -->
            <div
                class="bg-foreground/20 absolute bottom-0 left-0 h-1 transition-all duration-100"
                :style="{ width: `${progressWidth}%` }"
            />
        </ToastRoot>
    </Transition>
</template>

<style scoped>
.success-gradient {
    background: linear-gradient(to right, rgba(167, 243, 208, 0.2), rgba(110, 231, 183, 0.1));
}
.error-gradient {
    background: linear-gradient(to right, rgba(254, 202, 202, 0.2), rgba(252, 165, 165, 0.1));
}
.warning-gradient {
    background: linear-gradient(to right, rgba(254, 240, 138, 0.2), rgba(253, 224, 71, 0.1));
}
.info-gradient {
    background: linear-gradient(to right, rgba(191, 219, 254, 0.2), rgba(147, 197, 253, 0.1));
}

/* Add smooth transition for progress bar color based on variant */
.success-gradient .bg-foreground\/20 {
    @apply bg-green-500/20;
}
.error-gradient .bg-foreground\/20 {
    @apply bg-red-500/20;
}
.warning-gradient .bg-foreground\/20 {
    @apply bg-yellow-500/20;
}
.info-gradient .bg-foreground\/20 {
    @apply bg-blue-500/20;
}
</style>
