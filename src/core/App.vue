<script setup lang="ts">
import TheModals from "@common/components/TheModals/TheModals.vue";

import TheHeader from "@core/components/TheHeader/TheHeader.vue";
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <TheHeader></TheHeader>
  </header>
  <main class="container">
    <RouterView />
  </main>
  <TheModals></TheModals>
</template>
