<template>
    <Form class="grid gap-5 space-y-5" @submit="onSubmitForm">
        <div class="flex flex-col space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p class="text-sm text-gray-400">Enter your credentials below to proceed.</p>
        </div>

        <div class="grid gap-10">
            <div class="grid gap-5">
                <FormField name="email" v-slot="{ componentField }">
                    <FormItem :error-messages="v$.email.$errors.map(({ $message }: any) => $message)">
                        <FormLabel :class="{ 'text-red-900': v$.email.$errors.length }" for="email">Email Address</FormLabel>
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
            <div class="flex items-center justify-between gap-5">
                <Button
                    type="submit"
                    id="sign-in"
                    name="sign-in"
                    class="w-1/2"
                    size="lg"
                    :disabled="loading || isAllowedToSubmit"
                >
                    <Loader class="mr-1 h-4 w-4 animate-spin" v-if="loading" />
                    Sign In
                </Button>
                <Button variant="outline" class="w-1/2" size="lg" :disabled="loading" @click.prevent="onGoToSignUpPage">
                    Sign Up
                </Button>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { Button } from "@/components/base/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Loader } from "lucide-vue-next";

import { useLoginPage } from "./index.script";

const { v$, onSubmitForm, onGoToSignUpPage, loading, isAllowedToSubmit } = await useLoginPage();
</script>
