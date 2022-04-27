import App from "@_/App.vue";
import "@css/app.css";
import router from "@router";
import { createApp } from "vue";
import "element-plus/dist/index.css";

const app = createApp(App);

app.provide("router", router);
app.use(router);
app.mount("#app");
