<script setup lang="ts">
import stuffDummies from "@/assets/dummies/stuffs";
import ItemList from "@/components/ItemList.vue";
import StuffInfo from "@/components/StuffInfo.vue";
import { loading } from "@/models/Types";
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
      <span class="w-100 text-center">로딩 중</span>
    </template>
    <template v-else-if="selectedStuffDetail == undefined">
      <span class="w-100 text-center">
        데이터를 불러오는데 문제가 발생하였습니다.<br />
        새로고침 후에 다시 이용해 주세요.
      </span>
    </template>
    <template v-else>
      <StuffInfo></StuffInfo>
      <ItemList></ItemList>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;

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
