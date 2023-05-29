<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import StuffDetail from "@^stuffs/components/StuffDetailSection/StuffDetailSection.vue";
import StuffList from "@^stuffs/components/StuffList/StuffList.vue";
import StuffPageOnEmpty from "@^stuffs/components/StuffPageOnEmpty/StuffPageOnEmpty.vue";
import { getStuffListQuery } from "@^stuffs/components/utils/utils";
import { useStuffSelectedStore } from "@^stuffs/stores/stuffSelectedStore";

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const { data, isLoading, isError, isSuccess, isFetching } = getStuffListQuery();

const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return "Loading";
  if (isSuccess.value) return "Success";
  return "Error";
});
</script>

<template>
  <section class="stuff-list-page">
    <template v-if="isLoading || isError || (isSuccess && data?.size !== 0)">
      <StuffList></StuffList>
      <StuffDetail :inherit-status="dataLoadStatus" :key="selectedId"></StuffDetail>
    </template>
    <template v-else>
      <StuffPageOnEmpty></StuffPageOnEmpty>
    </template>
  </section>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;

.stuff-list-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);

  .stuff-list {
    max-width: calc(100% * $list-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $list-tab-ratio;

    background-color: $white;
  }

  .stuff-detail {
    max-width: calc(100% * $detail-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $detail-tab-ratio;

    background-color: $white;
  }
}
</style>
