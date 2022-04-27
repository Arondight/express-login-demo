<template>
  <el-button @click="remove" type="danger">{{ textRef }}</el-button>
</template>

<script setup>
import api from "@lib/api";
import { ElMessage } from "element-plus";
import { defineEmits, defineProps, inject, toRef } from "vue";

const props = defineProps({
  text: { type: String, default: "remove" },
  username: { type: String, default: "" },
});
const emit = defineEmits(["remove:done"]);
const textRef = toRef(props, "text");
const usernameRef = toRef(props, "username");
const router = inject("router");

function remove() {
  const apiName = "remove";
  const apiHandler = api.user[apiName] || (() => null);

  apiHandler(usernameRef.value)
    .then((res) => {
      if (200 === res.status && true === res.data.success) {
        if (usernameRef.value === localStorage.getItem("username")) {
          api.user
            .logout()
            .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }));
          router.push({ name: "Login" });
        }

        ElMessage({ type: "success", message: `${apiName} success`, showClose: true });
      } else {
        ElMessage({ type: "error", message: res.data.message || `${apiName} failed`, showClose: true });
      }
    })
    .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }))
    .finally(() => emit("remove:done"));
}
</script>
