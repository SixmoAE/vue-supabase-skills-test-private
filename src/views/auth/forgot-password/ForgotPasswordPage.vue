<script setup lang="ts">
import { Button } from "@/components/base/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Loader } from "lucide-vue-next";

import { useForgotPassword } from "@/composables";
import { RouterLink } from "vue-router";

const { isLoading, submitForm } = useForgotPassword();
</script>

<template>
    <form class="space-y-6" @submit="submitForm">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
            <p class="text-sm text-gray-500">Enter your email address to receive a password reset code.</p>
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

        <Button type="submit" id="forgot-password" name="forgot-password" :disabled="isLoading">
            <Loader class="mr-1 h-4 w-4 animate-spin" v-if="isLoading" />
            Submit
        </Button>

        <div class="flex gap-1">
            <p class="text-sm text-gray-500">Remembered your password?</p>
            <RouterLink to="/login" class="text-sm text-blue-500 hover:underline">Sign in</RouterLink>
        </div>
    </form>
</template>
