<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";

import StuffDetailContent from "@^stuffs/components/StuffDetailContent/StuffDetailContent.vue";
import ItemList from "@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue";
import { getStuffDetailQuery } from "@^stuffs/components/utils/utils";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";

const props = defineProps<{
  inheritStatus: "Loading" | "Success" | "Error";
}>();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const { isSuccess, isLoading, isFetching } = getStuffDetailQuery();

const dataLoadStatus = computed(() => {
  if (props.inheritStatus === "Loading") return "Loading";
  if (props.inheritStatus === "Error") return "Error";

  if (isFetching.value || isLoading.value) return "Loading";
  if (viewMode.value === "ADD" || isSuccess.value) return "Success";
  return "Error";
});
</script>

<template>
  <section class="stuff-detail">
    <template v-if="dataLoadStatus === 'Success'">
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
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
