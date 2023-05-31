<script setup lang="ts">
import TheHeader from '@common/components/TheHeader/TheHeader.vue';
import TheModals from '@common/components/TheModals/TheModals.vue';
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
