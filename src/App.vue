<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <Header></Header>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
