<script setup lang="ts">
import DataLoadErrorBox from "@common/components/DataLoadErrorBox/DataLoadErrorBox.vue";
import LoadingBox from "@common/components/LoadingBox/LoadingBox.vue";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@modules/stuffs/assets/dummies/stuffDummies";
import DetailStuffInfo from "@modules/stuffs/components/DetailStuffInfo/DetailStuffInfo.vue";
import ItemList from "@modules/stuffs/components/DetailStuffItemList/DetailStuffItemList.vue";
import { useStuffStore } from "@modules/stuffs/stores/stuffStore";

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
      // return null;
      return stuffDummies.find((e) => e.name == stuffIdx.name);
    }
  });
}
</script>

<template>
  <section class="stuff-detail">
    <template v-if="selectedStuffDetail == loading">
      <LoadingBox></LoadingBox>
    </template>
    <template v-else-if="selectedStuffDetail == undefined">
      <DataLoadErrorBox></DataLoadErrorBox>
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
