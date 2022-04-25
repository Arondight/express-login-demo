import App from "@_/App.vue";
import "@css/app.css";
import router from "@router";
import axios from "axios";
import { createApp } from "vue";
import "element-plus/dist/index.css";

const app = createApp(App);

axios.defaults.withCredentials = true;

app.provide("axios", axios);
app.provide("router", router);
app.use(router);
app.mount("#app");
