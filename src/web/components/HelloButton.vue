<template>
  <el-button>{{ textRef }}</el-button>
</template>

<script setup>
import { defineProps, ref, toRef } from "vue";

const props = defineProps({ text: { type: String, default: "World" } });
const textRef = ref(`Hello ${toRef(props, "text").value}!`);
</script>
