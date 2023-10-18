<script setup lang="ts">
import StuffEmptyPageRouter from '@^stuffs/components/StuffEmptyPageRouter/StuffEmptyPageRouter.vue';
</script>

<template>
  <section class="stuff-page">
    <StuffEmptyPageRouter></StuffEmptyPageRouter>
  </section>
</template>

<style lang="scss" scoped>
.stuff-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);
}
</style>
