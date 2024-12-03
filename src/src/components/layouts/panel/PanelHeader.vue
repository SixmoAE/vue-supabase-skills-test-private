<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/base/navigation-menu";

import { RouterLink } from "vue-router";
</script>

<template>
    <nav class="absolute top-0 z-50 flex h-10 w-full items-center border-b border-gray-200">
        <RouterLink :to="{ name: 'panel.dashboard' }" class="flex h-full items-center justify-center gap-2 px-6 py-2">
            <img src="./../../../assets/images/logo.svg" class="h-7" />
        </RouterLink>

        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" :class="navigationMenuTriggerStyle()"> Dashboard </NavigationMenuLink>
                    <NavigationMenuLink href="/example" :class="navigationMenuTriggerStyle()"> Example </NavigationMenuLink>

                    <NavigationMenuLink href="/logout" :class="navigationMenuTriggerStyle()"> Sign Out </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </nav>
</template>
