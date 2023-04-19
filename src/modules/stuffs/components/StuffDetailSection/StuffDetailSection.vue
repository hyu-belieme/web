<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, watchEffect } from "vue";

import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { loading } from "@common/types/Loading";

import { getStuff } from "@^stuffs/apis/stuffApis";
import StuffDetailContent from "@^stuffs/components/StuffDetailContent/StuffDetailContent.vue";
import ItemList from "@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

onBeforeMount(() => {
  watchEffect(() => {
    updateSelectedStuff();
  });
});

const stuffStore = useStuffStore();
const { selectedStuffDetail, selectedStuff } = storeToRefs(stuffStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const univCode = "HYU";
const deptCode = "CSE";

const updateSelectedStuff = () => {
  if (selectedStuff.value === loading) stuffStore.updateSelectedStuffDetail(loading);
  else if (selectedStuff.value === undefined) stuffStore.updateSelectedStuffDetail(undefined);
  else {
    stuffStore.updateSelectedStuffDetail(loading);
    getStuff(univCode, deptCode, selectedStuff.value.name)
      .then((data) => {
        stuffStore.updateSelectedStuffDetail(data);
      })
      .catch((error) => {
        console.error(error);
        stuffStore.updateSelectedStuffDetail(undefined);
      });
  }
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
