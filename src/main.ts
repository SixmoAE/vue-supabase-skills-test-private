import App from "./App.vue";

import "./assets/main.css";
import Router from "./router";
import { createPinia } from "pinia";
import { configure } from "vee-validate";
import { createApp } from "vue";

// Prevent vee-validate from validating fields immediately on interaction.
// Validation on blur and on change will still work.
configure({
    validateOnModelUpdate: false,
    validateOnInput: false,
});

const app = createApp(App);

app.use(createPinia());
app.use(Router);

app.mount("#app");
