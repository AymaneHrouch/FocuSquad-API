<template>
  <HomeComponent v-if="globalStore.room" />
  <h1 v-else>Looking for something buddy?</h1>
</template>

<script setup>
import HomeComponent from "@c/HomeComponent.vue";
import { useGlobalStore } from "./stores/global";

const globalStore = useGlobalStore();
</script>
