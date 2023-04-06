<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import Modals from "./components/Modals.vue";
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <Header></Header>
  </header>
  <main class="container">
    <RouterView />
  </main>
  <Modals></Modals>
</template>
