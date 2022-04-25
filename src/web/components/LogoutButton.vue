<template>
  <el-button @click="logout">{{ textRef }} </el-button>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { defineProps, inject, toRef } from "vue";

const props = defineProps({ text: { type: String, default: "logout" } });
const textRef = toRef(props, "text").value;
const axios = inject("axios");
const api = "logout";

function logout() {
  axios(`${window.location.protocol}//${window.location.hostname}:3000/user/${api}`, { method: "POST" })
    .then((res) => {
      if (200 === res.status && true === res.data.success) {
        ElMessage({ type: "success", message: `${api} success`, showClose: true });
        return;
      }

      ElMessage({ type: "error", message: res.data.message || `${api} failed`, showClose: true });
    })
    .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }));
}
</script>
