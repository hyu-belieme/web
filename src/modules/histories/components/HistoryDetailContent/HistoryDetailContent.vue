<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { loading } from "@common/types/Loading";

import ActionButtons from "@^histories/components/HistoryDetailButtons/HistoryDetailButtons.vue";
import InfoLabel from "@^histories/components/HistoryDetailInfoLabel/HistoryDetailInfoLabel.vue";
import InfoList from "@^histories/components/HistoryDetailInfoList/HistoryDetailInfoList.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);
</script>

<template>
  <section class="history-info">
    <template v-if="selectedHistory === loading">
      <LoadingView></LoadingView>
    </template>
    <template v-else-if="selectedHistory === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <InfoLabel></InfoLabel>
      <InfoList></InfoList>
      <ActionButtons></ActionButtons>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.history-info {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);
}
</style>
