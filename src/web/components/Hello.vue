<script setup>
import { defineProps, ref, toRef } from "vue";

const props = defineProps({
  msg: {
    type: String,
    default: "World",
  },
});

const text = ref(`Hello ${toRef(props, "msg").value}!`);
</script>

<template>
  <h1>{{ text }}</h1>
</template>
