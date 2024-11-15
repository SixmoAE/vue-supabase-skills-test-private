<script setup lang="ts">
import { ChevronDownIcon } from "@radix-icons/vue";
import { NavigationMenuTrigger, type NavigationMenuTriggerProps, useForwardProps } from "radix-vue";
import { navigationMenuTriggerStyle } from ".";

import { cn } from "@/lib/utils";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuTrigger v-bind="forwardedProps" :class="cn(navigationMenuTriggerStyle(), 'group', props.class)">
        <slot />
        <ChevronDownIcon
            class="relative top-px ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </NavigationMenuTrigger>
</template>
