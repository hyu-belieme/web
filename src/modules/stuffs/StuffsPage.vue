<script setup lang="ts">
import StuffDetail from "@^stuffs/components/StuffDetailSection/StuffDetailSection.vue";
import StuffList from "@^stuffs/components/StuffList/StuffList.vue";
import StuffPageOnEmpty from "@^stuffs/components/StuffPageOnEmpty/StuffPageOnEmpty.vue";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { loading } from "@common/types/Loading";

import { storeToRefs } from "pinia";

const stuffStore = useStuffStore();
const { stuffs } = storeToRefs(stuffStore);
</script>

<template>
  <section class="stuff-list-page">
    <template v-if="stuffs === loading || stuffs === undefined || stuffs.size !== 0">
      <StuffList></StuffList>
      <StuffDetail></StuffDetail>
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
