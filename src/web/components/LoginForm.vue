<template>
  <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-position="left" label-width="auto">
    <el-form-item label="username" prop="username">
      <el-input v-model="loginForm.username" placeholder="at least 3 characters" />
    </el-form-item>
    <el-form-item :clearable="true" label="password" prop="password">
      <el-input v-model="loginForm.password" placeholder="at least 6 characters" show-password />
    </el-form-item>
    <el-form-item v-if="isRegister" :rules="confirmItemRules" :clearable="true" label="confirm" prop="confirm">
      <el-input v-model="loginForm.confirm" placeholder="confirm password" show-password />
    </el-form-item>
    <el-form-item>
      <el-row :gutter="3">
        <el-col :span="12">
          <el-button @click="submit" type="primary">{{ true === isRegister ? "register" : "login" }}</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="isRegister = !isRegister">{{
            true === isRegister ? "login with an account" : "register an account"
          }}</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from "element-plus";
import lodash from "lodash";
import { defineProps, inject, reactive, ref, toRef } from "vue";

const axios = inject("axios");
const props = defineProps({ type: { type: String, default: "login" } });
const type = ref(toRef(props, "type").value);
let isRegister = ref("register" === type.value);
const loginFormRef = ref();
const loginForm = reactive({ username: "", password: "", confirm: "" });
const check = {
  username(rule, value, cb) {
    if (/^\w+$/.test(value)) {
      cb();
    } else {
      cb(new Error("username format error"));
    }
  },
  password(rule, value, cb) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/.test(value)) {
      cb();
    } else {
      cb(new Error("contain digit, uppercase and lowercase"));
    }
  },
  confirm(rule, value, cb) {
    const { password, confirm } = loginForm;

    if (password === confirm) {
      cb();
    } else {
      cb(new Error("passwords not match"));
    }
  },
};
const loginFormRules = reactive({
  username: [
    { required: true, message: "can not be empty", trigger: "blur" },
    { min: 3, message: "at least 3 characters", trigger: "blur" },
    { validator: check.username, trigger: "blur" },
  ],
  password: [
    { required: true, message: "can not be empty", trigger: "blur" },
    { min: 6, message: "at least 6 characters", trigger: "blur" },
    { validator: check.password, trigger: "blur" },
  ],
});
const confirmItemRules = reactive([
  { required: true, message: "can not be empty", trigger: "blur" },
  { min: 6, message: "at least 6 characters", trigger: "blur" },
  { validator: check.confirm, trigger: "blur" },
]);

function submit() {
  loginFormRef.value
    .validate((valid) => {
      const api = true === isRegister.value ? "register" : "login";

      if (!valid) {
        ElMessage({ type: "error", message: "please check your options", showClose: true });
        return;
      }

      axios(`${window.location.protocol}//${window.location.hostname}:3000/user/${api}`, {
        method: "POST",
        data: lodash.pick(loginForm, ["username", "password"]),
      })
        .then((res) => {
          if (200 === res.status && true === res.data.success) {
            if (true === isRegister.value) {
              isRegister.value = !isRegister.value;
              ElMessage({ type: "success", message: "register success", showClose: true });
              loginFormRef.value.resetFields();
              return;
            }

            ElMessage({ type: "success", message: "login success", showClose: true });
            return;
          }

          ElMessage({ type: "error", message: res.data.message || `${api} failed`, showClose: true });
        })
        .catch((e) => ElMessage({ type: "error", message: e.message || "api server error", showClose: true }));
    })
    .catch((e) => console.error(e));
}
</script>
