<script setup lang="ts">
import { Button } from "@/components/base/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Loader } from "lucide-vue-next";

import { useLogin } from "@/composables";
import { RouterLink } from "vue-router";

// CHANGE: Separated the login logic into a composable
const { submitForm, isLoading } = useLogin();
</script>

<template>
    <form class="space-y-6" @submit="submitForm">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
            <!-- CHANGE: Made description color contrast more readable -->
            <!-- CHANGE: Made the description more actionable -->
            <p class="text-sm text-gray-500">Welcome back! Please log in to continue.</p>
        </div>

        <FormField name="email" v-slot="{ componentField }">
            <FormItem>
                <FormLabel for="email">Email Address</FormLabel>

                <FormControl>
                    <Input type="email" placeholder="Email Address" :disabled="isLoading" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField name="password" v-slot="{ componentField }">
            <FormItem>
                <div class="flex justify-between">
                    <FormLabel for="password">Password</FormLabel>
                    <RouterLink tabindex="-1" to="/forgot-password" class="text-sm text-blue-500 hover:underline"> Forgot Password?</RouterLink>
                </div>
                <FormControl>
                    <Input type="password" placeholder="Password" :disabled="isLoading" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <!-- CHANGE: Made the button full width because it's the primary action -->
        <!-- Also considering the width of the button for mobile users -->
        <Button type="submit" id="sign-in" name="sign-in" :disabled="isLoading" class="w-full">
            <Loader class="mr-1 h-4 w-4 animate-spin" v-if="isLoading" />
            Sign In
        </Button>

        <!-- CHANGE: Added a link to the register page -->
        <div class="flex gap-1">
            <p class="text-sm text-gray-500">Don't have an account?</p>
            <RouterLink to="/register" class="text-sm text-blue-500 hover:underline"> Register Now </RouterLink>
        </div>
    </form>
</template>
