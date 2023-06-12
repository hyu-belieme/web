<script setup lang="ts">
import TheHeader from '@^header/TheHeader.vue';
import TheModalFrame from '@^modal-frame/TheModalFrame.vue';
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <TheHeader></TheHeader>
  </header>
  <main class="container">
    <RouterView />
  </main>
  <TheModalFrame></TheModalFrame>
</template>
