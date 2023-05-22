<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuery } from "vue-query";

import { getStuff } from "@common/apis/beliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";

import StuffDetailContent from "@^stuffs/components/StuffDetailContent/StuffDetailContent.vue";
import ItemList from "@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

const stuffStore = useStuffStore();
const { selectedId } = storeToRefs(stuffStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const { isSuccess, isLoading } = useQuery(stuffKeys.detail(), () => getStuff(selectedId.value));
</script>

<template>
  <section class="stuff-detail">
    <template v-if="viewMode === 'ADD'">
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
    </template>
    <template v-else-if="isSuccess">
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
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
