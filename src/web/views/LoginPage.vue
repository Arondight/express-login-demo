<template>
  <div id="login-form-div">
    <LoginForm type="login" />
  </div>
</template>

<script setup>
import LoginForm from "@components/LoginForm.vue";
</script>

<style>
#login-form-div {
  margin: auto;
  text-align: center;
  width: 350px;
}
</style>
