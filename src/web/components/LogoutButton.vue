<template>
  <el-button @click="logout">{{ textRef }}</el-button>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { defineProps, inject, toRef } from "vue";
import api from "@lib/api";

const props = defineProps({ text: { type: String, default: "logout" } });
const textRef = toRef(props, "text").value;
const router = inject("router");

function logout() {
  const apiName = "logout";
  const apiHandler = api.user[apiName] || (() => null);

  apiHandler()
    .then((res) => {
      if (200 === res.status && true === res.data.success) {
        localStorage.removeItem("username");
        router.push({ name: "Login" });
        ElMessage({ type: "success", message: `${apiName} success`, showClose: true });
      } else {
        ElMessage({ type: "error", message: res.data.message || `${apiName} failed`, showClose: true });
      }
    })
    .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }));
}
</script>
