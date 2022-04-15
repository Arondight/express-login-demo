import App from "@_/App.vue";
import "@css/app.css";
import router from "@router";
import axios from "axios";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import "element-plus/dist/index.css";

const app = createApp(App);

app.config.globalProperties.axios = axios;
app.provide("axios", app.config.globalProperties.axios);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
