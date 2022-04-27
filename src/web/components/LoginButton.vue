<template>
  <el-button @click="login">{{ textRef }}</el-button>
</template>

<script setup>
import { defineProps, inject, toRef } from "vue";

const router = inject("router");
const props = defineProps({ text: { type: String, default: "login" } });
const textRef = toRef(props, "text").value;

function login() {
  router.push({ name: "Login" });
}
</script>
