<script setup lang="ts">
import { loading } from "@common/types/Loading";

import { useHistoryStore } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);
</script>

<template>
  <template v-if="selectedHistory !== loading && selectedHistory !== undefined">
    <section class="label">
      <section class="thumbnail">{{ selectedHistory.item.stuff.thumbnail }}</section>
      <section class="name">
        {{ selectedHistory.item.stuff.name }} #{{ selectedHistory.item.num }}
      </section>
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
