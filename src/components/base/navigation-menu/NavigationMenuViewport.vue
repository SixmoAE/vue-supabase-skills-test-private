<script setup lang="ts">
import { NavigationMenuViewport, type NavigationMenuViewportProps, useForwardProps } from "radix-vue";

import { cn } from "@/lib/utils";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <div class="absolute left-0 top-full flex justify-center">
        <NavigationMenuViewport
            v-bind="forwardedProps"
            :class="
                cn(
                    'origin-top-center relative mt-1.5 h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 md:w-[--radix-navigation-menu-viewport-width]',
                    props.class,
                )
            "
        />
    </div>
</template>
