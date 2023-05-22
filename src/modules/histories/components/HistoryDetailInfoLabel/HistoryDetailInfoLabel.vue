<script setup lang="ts">
import { getHistoryDetailQuery } from "@^histories/queries/HistoryQueries";

const { isSuccess, data } = getHistoryDetailQuery();
</script>

<template>
  <template v-if="isSuccess">
    <section class="label">
      <section class="thumbnail">{{ data?.item.stuff.thumbnail }}</section>
      <section class="name">{{ data?.item.stuff.name }} #{{ data?.item.num }}</section>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.label {
  $label-height: 4rem;

  width: 100%;
  height: $label-height;

  display: flex;
  flex-direction: row;
  gap: map-get($spacers, 1);
  align-items: stretch;

  .thumbnail {
    line-height: $label-height;
    font-size: $h1-font-size;
  }

  .name {
    line-height: $label-height;
    font-size: $h3-font-size;
    flex-grow: 1;
  }
}
</style>
