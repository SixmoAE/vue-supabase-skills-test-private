<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from "radix-vue";

import { cn } from "@/lib/utils";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuList
        v-bind="forwardedProps"
        :class="cn('group flex flex-1 list-none items-center justify-center gap-x-1', props.class)"
    >
        <slot />
    </NavigationMenuList>
</template>
