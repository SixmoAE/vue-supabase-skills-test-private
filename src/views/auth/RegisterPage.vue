<script setup lang="ts">
import { Button } from "@/components/base/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { useToast } from "@/components/base/toast/use-toast";
import { Loader } from "lucide-vue-next";

import { registerFormSchema, type TRegisterFormSchema } from "@/lib/schema";
import { useAuthStore } from "@/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const { toast } = useToast();
const isLoading = ref(false);

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};

/**
 * We'll be using the zod schema defined in `lib/schema.ts` for
 * form validation and to infer the types of the form fields.
 *
 * This will be helpful in improving the user experience by providing instant feedback
 * on the form fields, and will also prevent sending invalid data to supabase.
 */

const validationSchema = toTypedSchema(registerFormSchema);

const form = ref<TRegisterFormSchema>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
});

const submitForm = async (payload: any) => {
    toggleLoading();

    const { email, password, first_name, last_name } = payload;

    /**
     * Sign up the user with the provided credentials and profile data.
     * I've defined a supabase db function and trigger that will automatically generate
     * profile data when they sign up.
     */
    const { error } = await authStore.signUp({
        email,
        password,
        options: {
            data: {
                first_name,
                last_name,
            },
        },
    });

    setTimeout(() => {
        if (error) {
            toast({ description: error.message, variant: "destructive" });
        } else {
            router.push({ name: "panel.dashboard" });
            toast({ description: "Welcome!" });
        }

        toggleLoading();
    }, 500);
};
</script>

<template>
    <Form class="space-y-6" :validation-schema="validationSchema" @submit="submitForm(form)">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p class="text-sm text-gray-400">Enter your details to create a new account.</p>
        </div>

        <div class="flex space-x-2">
            <FormField name="first_name" v-slot="{ componentField }">
                <FormItem>
                    <FormLabel for="first_name">First Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="First Name"
                        :required="true"
                        v-model="form.first_name"
                        :disabled="isLoading"
                        v-bind="componentField"
                    />
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField name="last_name" v-slot="{ componentField }">
                <FormItem>
                    <FormLabel for="last_name">Last Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        :required="true"
                        v-model="form.last_name"
                        :disabled="isLoading"
                        v-bind="componentField"
                    />
                    <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField name="confirm_password" v-slot="{ componentField }">
            <FormItem>
                <FormLabel for="confirm_password">Confirm Password</FormLabel>
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    :required="true"
                    v-model="form.confirm_password"
                    :disabled="isLoading"
                    v-bind="componentField"
                />
                <FormMessage />
            </FormItem>
        </FormField>

        <Button type="submit" id="sign-in" name="sign-in" :disabled="isLoading">
            <Loader class="mr-1 h-4 w-4 animate-spin" v-if="isLoading" />
            Sign Up
        </Button>
        <p class="text-sm text-gray-500">
            Already have an account?
            <RouterLink :to="{ path: '/login' }"><b class="underline underline-offset-2">Sign In</b></RouterLink>
        </p>
    </Form>
</template>
