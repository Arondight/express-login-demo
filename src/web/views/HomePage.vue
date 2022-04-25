<template>
  <div>
    <LogoutButton v-show="true === loggedRef" />
    <LoginButton v-show="false === loggedRef" />
    <p v-show="false === loggedRef">you are logged out.</p>
  </div>
</template>

<script setup>
import LoginButton from "@components/LoginButton.vue";
import LogoutButton from "@components/LogoutButton.vue";
import { inject, ref } from "vue";

const axios = inject("axios");
const loggedRef = ref(true);

(function check() {
  const api = "check";

  axios(`${window.location.protocol}//${window.location.hostname}:3000/user/${api}`, { method: "POST" })
    .then((res) => (loggedRef.value = 200 === res.status && true === res.data.success))
    .catch((e) => console.error(e));
})();
</script>
