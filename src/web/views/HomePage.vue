<template>
  <el-container>
    <el-header>
      <LogoutButton v-show="true === loggedRef" />
      <LoginButton v-show="false === loggedRef" />
    </el-header>
    <el-main v-show="true === loggedRef">
      <el-table :data="users" stripe>
        <el-table-column prop="username" label="username" sortable />
        <el-table-column prop="ctime" label="ctime" sortable />
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup>
import LoginButton from "@components/LoginButton.vue";
import LogoutButton from "@components/LogoutButton.vue";
import { inject, reactive, ref } from "vue";

const axios = inject("axios");
const loggedRef = ref(true);
const users = reactive([]);

(function init() {
  axios(`${window.location.protocol}//${window.location.hostname}:3000/user/check`, { method: "POST" })
    .then((res) => {
      return (loggedRef.value = 200 === res.status && true === res.data.success);
    })
    .then((logged) => {
      if (true === logged) {
        axios(`${window.location.protocol}//${window.location.hostname}:3000/user/users`, { method: "GET" }).then(
          (res) => res.data.users.forEach((c) => users.push(c))
        );
        return;
      }

      users.splice(0, users.length);
    })
    .catch((e) => console.error(e));
})();
</script>
