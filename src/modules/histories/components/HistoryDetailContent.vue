<script setup lang="ts">
import { toRef } from 'vue';

import type History from '@common/models/History';
import type UserMode from '@common/types/UserMode';

import HistoryDetailButtons from '@^histories/components/HistoryDetailButtons.vue';
import InfoLabel from '@^histories/components/HistoryDetailInfoLabel.vue';
import InfoList from '@^histories/components/HistoryDetailInfoList.vue';

const props = defineProps<{
  userToken: string;
  userMode: UserMode;
  data: History;
}>();

const data = toRef(props, 'data');
</script>

<template>
  <section class="history-info">
    <InfoLabel :data="data"></InfoLabel>
    <InfoList :data="data"></InfoList>
    <HistoryDetailButtons
      :user-token="userToken"
      :user-mode="userMode"
      :data="data"
    ></HistoryDetailButtons>
  </section>
</template>

<style lang="scss" scoped>
.history-info {
  background-color: $white;
  border: $border-width solid $border-color;
  @include border-radius($border-radius);

  padding: map-get($map: $spacers, $key: 2);

  display: flex;
  flex-direction: column;
}
</style>
