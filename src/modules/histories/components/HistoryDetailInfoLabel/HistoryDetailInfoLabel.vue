<script setup lang="ts">
import { getHistoryDetailQuery } from '@^histories/components/utils/history-query-utils';

const { isSuccess, data } = getHistoryDetailQuery();
</script>

<template>
  <template v-if="isSuccess && data !== undefined">
    <section class="label">
      <section class="thumbnail">
        <span class="position-absolute start-50 top-50 translate-middle">
          {{ data.stuff.thumbnail }}
        </span>
      </section>
      <section class="name">
        <span class="position-absolute top-50 translate-middle-y">
          {{ data.stuff.name }} #{{ data.item.num }}
        </span>
      </section>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.label {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  gap: map-get($spacers, 1);
  align-items: stretch;

  .thumbnail {
    width: 4rem;
    height: 4rem;
    font-size: $h1-font-size;
    text-align: center;

    position: relative;
  }

  .name {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    flex-grow: 1;

    position: relative;
  }
}
</style>
