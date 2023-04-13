<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@^stuffs/assets/dummies/stuffDummies";
import DetailStuffInfo from "@^stuffs/components/DetailStuffInfo/DetailStuffInfo.vue";
import ItemList from "@^stuffs/components/DetailStuffItemList/DetailStuffItemList.vue";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { storeToRefs } from "pinia";
import { watch } from "vue";

const stuffStore = useStuffStore();
const { selectedStuff, selectedStuffDetail } = storeToRefs(stuffStore);

watch(selectedStuff, () => updateStuff());
updateStuff();

// ====== functions ======
function updateStuff() {
  stuffStore.updateSelectedStuffDetail({
    load: (stuffIdx: Stuff) => {
      // return undefined;
      // return loading;
      return stuffDummies.find((e) => e.name === stuffIdx.name);
    }
  });
}
</script>

<template>
  <section class="stuff-detail">
    <template v-if="selectedStuffDetail === loading">
      <LoadingBox></LoadingBox>
    </template>
    <template v-else-if="selectedStuffDetail === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <DetailStuffInfo></DetailStuffInfo>
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
