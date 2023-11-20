<script setup lang="ts"></script>

<template>
  <section class="item-list">
    <slot name="item-list"></slot>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 2);
}
</style>
