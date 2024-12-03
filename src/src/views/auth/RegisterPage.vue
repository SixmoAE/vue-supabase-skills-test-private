<script setup lang="ts">
import { Button } from "@/components/base/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { useToast } from "@/components/base/toast/use-toast";
import { Loader } from "lucide-vue-next";

import { useAuthStore } from "@/stores/auth";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const { toast } = useToast();
const isLoading = ref(false);

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const form = ref<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
});

const formTouched = ref(false);

const formErrors = computed(() => {
    const errors: { email?: string; password?: string; firstName?: string; lastName?: string } = {};
    if (formTouched.value) {
        if (!form.value.firstName) {
            errors.firstName = "First name is required.";
        }
        if (!form.value.lastName) {
            errors.lastName = "Last name is required.";
        }
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

const submitForm = async (payload: FormData) => {
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

    const { error } = await authStore.signUp({
        email: payload.email,
        password: payload.password,
        options: {
            data: {
                first_name: payload.firstName,
                last_name: payload.lastName,
            },
        },
    });

    setTimeout(() => {
        if (error) {
            toast({
                variant: "error",
                description: error.message,
                duration: 5000,
            });
        } else {
            router.push({ name: "auth.login" });
            toast({
                variant: "success",
                description: "Registration successful! Please check your email to verify your account.",
                duration: 5000,
            });
        }

        toggleLoading();
    }, 500);
};

// Watch for changes in form fields to set formTouched
watch(form, () => {
    formTouched.value = true;
});
</script>

<template>
    <Form class="space-y-6" @submit="submitForm(form)">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Create Account</h1>
            <p class="text-sm text-gray-400">Enter your details below to create your account.</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
            <FormField name="firstName" v-slot="{ componentField }">
                <FormItem>
                    <FormLabel for="firstName">First Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="First Name"
                        :required="true"
                        v-model="form.firstName"
                        :disabled="isLoading"
                        v-bind="componentField"
                    />
                    <p v-if="formErrors.firstName" class="text-sm text-red-500">{{ formErrors.firstName }}</p>
                </FormItem>
            </FormField>

            <FormField name="lastName" v-slot="{ componentField }">
                <FormItem>
                    <FormLabel for="lastName">Last Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        :required="true"
                        v-model="form.lastName"
                        :disabled="isLoading"
                        v-bind="componentField"
                    />
                    <p v-if="formErrors.lastName" class="text-sm text-red-500">{{ formErrors.lastName }}</p>
                </FormItem>
            </FormField>
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

        <div class="flex flex-col gap-4">
            <Button type="submit" id="sign-up" name="sign-up" :disabled="isLoading || Object.keys(formErrors).length > 0">
                <Loader class="mr-1 h-4 w-4 animate-spin" v-if="isLoading" />
                Create Account
            </Button>

            <div class="text-center text-sm">
                Already have an account?
                <RouterLink :to="{ name: 'auth.login' }" class="text-primary-600 hover:underline"> Sign in here </RouterLink>
            </div>
        </div>
    </Form>
</template>
