<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@^stuffs/assets/dummies/stuffDummies";
import StuffDetailContent from "@^stuffs/components/StuffDetailContent/StuffDetailContent.vue";
import ItemList from "@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { storeToRefs } from "pinia";
import { onBeforeMount, watchEffect } from "vue";

onBeforeMount(() => {
  watchEffect(() => {
    updateSelectedStuff();
  });
});

const stuffStore = useStuffStore();
const { selectedStuffDetail } = storeToRefs(stuffStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const updateSelectedStuff = () => {
  stuffStore.updateSelectedStuffDetail({
    load: (stuffIdx: Stuff) => {
      // return undefined;
      // return loading;
      return stuffDummies.find((e) => e.name === stuffIdx.name);
    }
  });
};
</script>

<template>
  <section class="stuff-detail">
    <template v-if="viewMode === 'ADD'">
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
    </template>
    <template v-else-if="selectedStuffDetail === loading">
      <LoadingView></LoadingView>
    </template>
    <template v-else-if="selectedStuffDetail === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;
  overflow: scroll;

  padding: map-get($map: $spacers, $key: 4);
  gap: map-get($map: $spacers, $key: 4);

  .stuff-info {
    flex-grow: 0;
  }

  .item-list {
    flex-grow: 1;
  }
}
</style>
