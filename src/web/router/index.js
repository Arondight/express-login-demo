import { createRouter, createWebHistory } from "vue-router";
import HelloPage from "@views/HelloPage.vue";
import HomePage from "@views/HomePage.vue";
import LoginPage from "@views/LoginPage.vue";
import NotFoundPage from "@views/NotFoundPage.vue";
import RegisterPage from "@views/RegisterPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/hello", name: "Hello", component: HelloPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFoundPage },
];

export default createRouter({ history: createWebHistory(), routes });
