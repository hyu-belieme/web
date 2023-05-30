<script setup lang="ts">
import { computed } from "vue";

import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";

import ActionButtons from "@^histories/components/HistoryDetailButtons/HistoryDetailButtons.vue";
import InfoLabel from "@^histories/components/HistoryDetailInfoLabel/HistoryDetailInfoLabel.vue";
import InfoList from "@^histories/components/HistoryDetailInfoList/HistoryDetailInfoList.vue";
import { getHistoryDetailQuery } from "@^histories/components/utils/utils";

const props = defineProps<{
  inheritStatus: "Loading" | "Success" | "Error";
}>();

const { isFetching, isLoading, isSuccess } = getHistoryDetailQuery();

const dataLoadStatus = computed(() => {
  if (props.inheritStatus === "Loading") return "Loading";
  if (props.inheritStatus === "Error") return "Error";

  if (isFetching.value || isLoading.value) return "Loading";
  if (isSuccess.value) return "Success";
  return "Error";
});
</script>

<template>
  <section class="history-info">
    <template v-if="dataLoadStatus === 'Success'">
      <InfoLabel></InfoLabel>
      <InfoList></InfoList>
      <ActionButtons></ActionButtons>
    </template>
    <template v-else-if="dataLoadStatus === 'Loading'">
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
