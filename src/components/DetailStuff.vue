<script setup lang="ts">
import stuffDummies from "@/assets/dummies/stuffs";
import ItemList from "@/components/ItemList.vue";
import StuffInfo from "@/components/StuffInfo.vue";
import type Stuff from "@/models/stuff/Stuff.js";
import { useStuffStore } from "@/stores/stuffStore";
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
      return stuffDummies.find((e) => e.name == stuffIdx.name);
    }
  });
}
</script>

<template>
  <section class="stuff-detail">
    <section v-if="selectedStuffDetail != undefined">
      <StuffInfo></StuffInfo>
      <ItemList></ItemList>
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
