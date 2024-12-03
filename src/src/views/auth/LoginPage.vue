<script setup lang="ts">
import { Button } from "@/components/base/button";
import { Checkbox } from "@/components/base/checkbox";
import { Form, FormField, FormItem, FormLabel } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { useToast } from "@/components/base/toast/use-toast";
import { Loader } from "lucide-vue-next";

import { useAuthStore } from "@/stores/auth";
import { computed, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const { toast } = useToast();
const isLoading = ref(false);
const rememberMe = ref(false);
const formTouched = ref(false);

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};

const form = ref({
    email: "",
    password: "",
});

const formErrors = computed(() => {
    const errors: { email?: string; password?: string } = {};
    if (formTouched.value) {
        if (!form.value.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
            errors.email = "Email is not valid.";
        }
        if (!form.value.password) {
            errors.password = "Password is required.";
        }
    }
    return errors;
});

const submitForm = async (payload: any) => {
    formTouched.value = true;
    if (Object.keys(formErrors.value).length > 0) {
        toast({
            variant: "error",
            title: "Oops",
            description: "Please fix the errors in the form.",
        });
        return;
    }
    toggleLoading();

    const response =
        (await authStore.signInWithPassword({
            ...payload,
            options: {
                remember: rememberMe.value,
            },
        })) || {};

    const { error } = response;

    setTimeout(() => {
        if (error) {
            toast({
                variant: "error",
                title: "Error",
                description: error.message,
            });
        } else {
            router.push({ name: "panel.dashboard" });
            toast({
                variant: "success",
                title: "Success",
                description: "Welcome back!",
            });
        }

        toggleLoading();
    }, 500);
};

// UX Reasoning for Google Sign-In:
// Adding Google Sign-In enhances the user experience by providing a quick and convenient way for users to log in without needing to remember another password.
// It leverages the user's existing Google account, which many users already have, thus reducing friction during the login process.
// This can lead to higher conversion rates and user satisfaction as it simplifies the authentication process.

// Implementation Details:
// The Google Sign-In is implemented using Supabase's OAuth capabilities.
// The `signInWithGoogle` function in the auth store triggers the OAuth flow, redirecting the user to Google's authentication page.
// Upon successful authentication, the user is redirected back to the application, where they are automatically logged in.
// This is achieved by configuring the redirect URL in the Supabase settings and handling the callback in the application.

const signInWithGoogle = async () => {
    toggleLoading();
    const { error } = await authStore.signInWithGoogle();

    if (error) {
        toast({
            variant: "error",
            title: "Error",
            description: error.message,
        });
        toggleLoading();
    }
};

const handleForgotPassword = async () => {
    if (!form.value.email) {
        toast({
            variant: "error",
            title: "Error",
            description: "Please enter your email address",
        });
        return;
    }

    toggleLoading();
    const { error } = await authStore.resetPassword(form.value.email);

    toggleLoading();
    if (error) {
        toast({
            variant: "error",
            title: "Error",
            description: error.message,
        });
    } else {
        toast({
            variant: "success",
            title: "Success",
            description: "Password reset instructions sent to your email",
        });
    }
};

// Watch for changes in form fields to set formTouched
watch(form, () => {
    formTouched.value = true;
});
</script>

<template>
    <Form class="space-y-6" @submit="submitForm(form)">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p class="text-sm text-gray-400">Enter your credentials below to proceed.</p>
        </div>

        <FormField name="email" v-slot="{ componentField }">
            <FormItem>
                <FormLabel for="email">Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Email Address"
                    :required="true"
                    v-model="form.email"
                    :disabled="isLoading"
                    v-bind="componentField"
                />
                <p v-if="formErrors.email" class="text-sm text-red-500">{{ formErrors.email }}</p>
            </FormItem>
        </FormField>

        <FormField name="password" v-slot="{ componentField }">
            <FormItem>
                <FormLabel for="password">Password</FormLabel>
                <Input
                    type="password"
                    placeholder="Password"
                    :required="true"
                    v-model="form.password"
                    :disabled="isLoading"
                    v-bind="componentField"
                />
                <p v-if="formErrors.password" class="text-sm text-red-500">{{ formErrors.password }}</p>
            </FormItem>
        </FormField>

        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <Checkbox id="remember" v-model:checked="rememberMe" />
                <label for="remember" class="text-sm text-gray-500">Remember me</label>
            </div>
            <button
                type="button"
                class="text-sm text-primary-600 hover:underline"
                @click="handleForgotPassword"
                :disabled="isLoading"
            >
                Forgot password?
            </button>
        </div>

        <div class="space-y-4">
            <Button
                type="submit"
                id="sign-in"
                name="sign-in"
                :disabled="isLoading || Object.keys(formErrors).length > 0"
                class="w-full"
            >
                <Loader class="mr-1 h-4 w-4 animate-spin" v-if="isLoading" />
                Sign In
            </Button>

            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t" />
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <Button type="button" variant="outline" @click="signInWithGoogle" :disabled="isLoading" class="w-full">
                <img src="@/assets/images/google.svg" alt="Google" class="h-4 w-4" />
                Google
            </Button>

            <div class="text-center text-sm text-gray-500">
                Don't have an account?
                <RouterLink :to="{ name: 'auth.register' }" class="font-semibold text-primary-600 hover:text-primary-500">
                    Sign up
                </RouterLink>
            </div>
        </div>
    </Form>
</template>
