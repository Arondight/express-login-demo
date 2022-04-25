<template>
  <el-card class="box-card" shadow="hover">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <LoginForm type="login" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import LoginForm from "@components/LoginForm.vue";
</script>
