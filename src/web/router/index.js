import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/hello", name: "Home", component: () => import("../views/Hello.vue") },
  { path: "/login", name: "Login", component: () => import("../views/Login.vue") },
  { path: "/:catchAll(.*)", name: "404", component: () => import("../views/404.vue") },
];

export default createRouter({ history: createWebHashHistory(), routes });
