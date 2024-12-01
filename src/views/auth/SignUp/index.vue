<template>
    <Form class="grid gap-5 space-y-5" @submit="onSubmitForm">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p class="text-sm text-gray-400">Please complete to create your account.</p>
        </div>

        <div class="grid gap-10">
            <div class="grid gap-5">
                <div class="grid grid-cols-2 gap-5">
                    <FormField name="first_name" v-slot="{ componentField }">
                        <FormItem :error-messages="v$.first_name.$errors.map(({ $message }: any) => $message)">
                            <FormLabel for="first_name" :class="{ 'text-red-900': v$.first_name.$errors.length }"
                                >First Name</FormLabel
                            >
                            <Input
                                type="text"
                                :required="true"
                                v-model.trim="v$.first_name.$model"
                                :disabled="loading"
                                :error="Boolean(v$.first_name.$errors.length)"
                                v-bind="componentField"
                                @blur="v$.first_name.$touch"
                            />
                        </FormItem>
                    </FormField>
                    <FormField name="last_name" v-slot="{ componentField }">
                        <FormItem :error-messages="v$.last_name.$errors.map(({ $message }: any) => $message)">
                            <FormLabel for="last_name" :class="{ 'text-red-900': v$.last_name.$errors.length }"
                                >Last Name</FormLabel
                            >
                            <Input
                                type="text"
                                :required="true"
                                v-model.trim="v$.last_name.$model"
                                :disabled="loading"
                                :error="Boolean(v$.last_name.$errors.length)"
                                v-bind="componentField"
                                @blur="v$.last_name.$touch"
                            />
                        </FormItem>
                    </FormField>
                </div>
                <FormField name="email" v-slot="{ componentField }">
                    <FormItem :error-messages="v$.email.$errors.map(({ $message }: any) => $message)">
                        <FormLabel for="email" :class="{ 'text-red-900': v$.email.$errors.length }">Email Address</FormLabel>
                        <Input
                            type="email"
                            :required="true"
                            v-model.trim="v$.email.$model"
                            :disabled="loading"
                            :error="Boolean(v$.email.$errors.length)"
                            v-bind="componentField"
                            @blur="v$.email.$touch"
                        />
                    </FormItem>
                </FormField>
                <FormField name="password" v-slot="{ componentField }">
                    <FormItem :error-messages="v$.password.$errors.map(({ $message }: any) => $message)">
                        <FormLabel for="password" :class="{ 'text-red-900': v$.password.$errors.length }">Password</FormLabel>
                        <Input
                            type="password"
                            :required="true"
                            v-model.trim="v$.password.$model"
                            :disabled="loading"
                            :error="Boolean(v$.password.$errors.length)"
                            v-bind="componentField"
                            @blur="v$.password.$touch"
                        />
                    </FormItem>
                </FormField>
            </div>
            <div class="grid place-items-center gap-2">
                <Button
                    type="submit"
                    id="sign-in"
                    name="sign-in"
                    class="w-1/2"
                    size="lg"
                    :disabled="loading || isAllowedToSubmit"
                >
                    <Loader class="mr-1 h-4 w-4 animate-spin" v-if="loading" />
                    Sign Up
                </Button>
                <RouterLink
                    :to="{ path: '/login' }"
                    variant="link"
                    size="lg"
                    class="rounded-md p-2 text-xs transition-all hover:bg-gray-50"
                >
                    Already have an account?
                </RouterLink>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { Button } from "@/components/base/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Loader } from "lucide-vue-next";

import { useSignUpPage } from "./index.script";

const { v$, loading, onSubmitForm, isAllowedToSubmit } = await useSignUpPage();
</script>
