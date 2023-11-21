<script setup lang="ts">
import { toRef } from 'vue';

import type History from '@common/models/History';

import HistoryDetailContent from '@^histories/components/HistoryDetailContent.vue';
import ProcedureDesc from '@^histories/components/ProcedureDesc.vue';

const props = defineProps<{
  data: History | undefined;
}>();

const data = toRef(props, 'data');
</script>

<template>
  <section class="history-detail">
    <HistoryDetailContent :data="data"></HistoryDetailContent>
    <ProcedureDesc></ProcedureDesc>
  </section>
</template>

<style lang="scss" scoped>
.history-detail {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .history-info {
    flex-grow: 0;
  }

  .procedure-desc {
    flex-grow: 1;
  }
}
</style>
