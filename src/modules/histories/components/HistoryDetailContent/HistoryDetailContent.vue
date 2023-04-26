<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuery } from "vue-query";

import { getHistory } from "@common/apis/beliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";

import ActionButtons from "@^histories/components/HistoryDetailButtons/HistoryDetailButtons.vue";
import InfoLabel from "@^histories/components/HistoryDetailInfoLabel/HistoryDetailInfoLabel.vue";
import InfoList from "@^histories/components/HistoryDetailInfoList/HistoryDetailInfoList.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

const { isLoading, isSuccess } = useQuery(historyKeys.detail(), () => getHistory(selectedId.value));
</script>

<template>
  <section class="history-info">
    <template v-if="isSuccess">
      <InfoLabel></InfoLabel>
      <InfoList></InfoList>
      <ActionButtons></ActionButtons>
    </template>
    <template v-else-if="isLoading">
      <LoadingView></LoadingView>
    </template>
    <template v-else>
      <DataLoadFailView></DataLoadFailView>
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
