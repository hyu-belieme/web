<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { onMounted, watchEffect } from 'vue';

import StuffDetailTab from '@^stuffs/components/StuffDetailTab.vue';
import StuffListTab from '@^stuffs/components/StuffListTab.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const { isSuccess, data } = getStuffListQuery();

onMounted(() => {
  function convertIdToFirstIdIfNotExist(currentId: string) {
    if (data.value === undefined || data.value.isEmpty()) return NIL_UUID;
    const selected = data.value.find((value) => value.id === currentId);
    if (selected === undefined) return data.value.get(0)?.id || NIL_UUID;
    return selected.id;
  }
  watchEffect(() => {
    if (!isSuccess.value) return;
    const newId = convertIdToFirstIdIfNotExist(selectedId.value);
    stuffStore.updateSelectedId(newId);
  });
});
</script>

<template>
  <section class="tabs-wrapper">
    <section class="list-section">
      <StuffListTab></StuffListTab>
    </section>
    <section class="detail-section">
      <StuffDetailTab :key="selectedId"></StuffDetailTab>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .list-section {
    width: 24rem;
    height: 100%;
  }

  .detail-section {
    width: 0;
    height: 100%;

    flex-grow: 1;
  }
}
</style>
