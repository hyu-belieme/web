<script setup>
import StuffInfo from "@/components/StuffInfo.vue";
import ItemList from "@/components/ItemList.vue";
import stuffDummies from "@/assets/dummies/stuffs.js";
import { storeToRefs } from "pinia";
import { useStuffStore } from "@/stores/stuff";

import { watch } from "vue";

const stuffStore = useStuffStore();
const { selectedStuff, selectedStuffDetail } = storeToRefs(stuffStore);

function updateStuff() {
  stuffStore.updateSelectedStuffDetail({
    load: (stuffIdx) => {
      return stuffDummies.find((e) => e.name == stuffIdx.name);
    }
  });
}

watch(selectedStuff, () => updateStuff());
updateStuff();
</script>

<template>
  <section class="stuff-detail">
    <section v-if="selectedStuffDetail != undefined">
      <StuffInfo v-bind="{ stuff: selectedStuffDetail }"></StuffInfo>
      <ItemList v-bind="{ items: selectedStuffDetail.itemList }"></ItemList>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;

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
