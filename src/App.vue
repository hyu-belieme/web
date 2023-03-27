<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <Header></Header>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";
</style>
