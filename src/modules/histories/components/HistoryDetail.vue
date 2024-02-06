<script setup lang="ts">
import { toRef } from 'vue';

import type History from '@common/models/History';
import type UserMode from '@common/types/UserMode';

import HistoryDetailContent from '@^histories/components/HistoryDetailContent.vue';
import ProcedureDesc from '@^histories/components/ProcedureDesc.vue';

const props = defineProps<{
  userToken: string;
  userMode: UserMode;
  data: History | undefined;
}>();

const data = toRef(props, 'data');
</script>

<template>
  <section class="history-detail">
    <HistoryDetailContent
      :user-token="userToken"
      :user-mode="userMode"
      :data="data"
    ></HistoryDetailContent>
    <ProcedureDesc :user-mode="userMode"></ProcedureDesc>
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
