import App from "./App.vue";

import "./assets/main.css";
import Router from "./router";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);

app.use(createPinia());
app.use(Router);

app.mount("#app");
