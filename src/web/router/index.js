import Hello from "@views/Hello.vue";
import Login from "@views/Login.vue";
import NotFound from "@views/NotFound.vue";
import Register from "@views/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/hello", name: "Home", component: Hello },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
];

export default createRouter({ history: createWebHistory(), routes });
