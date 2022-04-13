import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/hello", name: "Home", component: () => import("@views/Hello.vue") },
  { path: "/login", name: "Login", component: () => import("@views/Login.vue") },
  { path: "/register", name: "Register", component: () => import("@views/Register.vue") },
  { path: "/:catchAll(.*)", name: "NotFound", component: () => import("@views/NotFound.vue") },
];

export default createRouter({ history: createWebHashHistory(), routes });
