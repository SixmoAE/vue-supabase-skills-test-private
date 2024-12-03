<script setup lang="ts">
import { Auth } from ".";

import authBgImage from "./../../../assets/images/auth-bg.jpg";
import { RouterView } from "vue-router";
</script>

<template>
    <Auth title="Vestibulum Finibus" description="Lorem ipsum dolor sit amet." :showcaseImagePath="authBgImage">
        <RouterView />
    </Auth>
</template>
