<script lang="ts" setup>
import { useFormField } from "./useFormField";
import { ErrorMessage } from "vee-validate";
import { toValue } from "vue";

const { name, formMessageId } = useFormField();
</script>

<template>
    <ErrorMessage
        :id="formMessageId"
        as="p"
        :name="toValue(name)"
        class="text-[0.8rem] font-medium text-red-500 dark:text-red-900"
    />
</template>
