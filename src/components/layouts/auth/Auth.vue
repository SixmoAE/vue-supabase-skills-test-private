<script setup lang="ts">
const props = defineProps<{
    title: string;
    description: string;
    showcaseImagePath: string | undefined;
}>();
</script>

<template>
    <div class="flex min-h-full flex-1">
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover" :src="props.showcaseImagePath" alt="" />
            <div class="absolute left-0 top-0 h-full w-full bg-black bg-opacity-40">
                <div class="flex h-full w-full items-end justify-start bg-gradient-to-t from-black via-transparent">
                    <div class="flex w-full flex-col gap-2 px-24 py-16">
                        <h1 class="text-4xl font-black uppercase tracking-wide text-gray-50 xl:text-5xl">
                            <span class="text-primary-500">{{ props.title }}</span>
                        </h1>

                        <p class="text-xl font-medium text-gray-200">
                            {{ props.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-1 flex-col justify-center bg-white px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <!-- CHANGE: Removed the link to login page -->
                <!-- It might be confusing especially for users registering -->
                <div class="mb-6">
                    <img class="h-10 w-auto" src="./../../../assets/images/logo.svg" />
                </div>

                <slot />
            </div>
        </div>
    </div>
</template>
