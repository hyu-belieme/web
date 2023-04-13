<script setup lang="ts">
import { loading, type Loading } from "@common/types/Loading";
import type { ItemInfoOnly } from "@common/types/Models";

import ItemListCell from "@^stuffs/components/StuffDetailItemListCell/StuffDetailItemListCell.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { List } from "immutable";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watchEffect } from "vue";

onBeforeMount(() => {
  items.value = selectedStuffItems.value;

  watchEffect(() => {
    items.value = selectedStuffItems.value;
  });

  watchEffect(() => {
    if (viewMode.value === "SHOW") {
      items.value = selectedStuffItems.value;
    } else if (viewMode.value === "ADD") {
      items.value = List();
    }
  });
});

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const stuffStore = useStuffStore();
const { selectedStuffItems } = storeToRefs(stuffStore);

const items = ref<Loading | List<ItemInfoOnly> | undefined>(undefined);

const selectedStuffItemsSize = () => {
  if (selectedStuffItems.value === loading || selectedStuffItems.value === undefined) {
    return 0;
  }
  return selectedStuffItems.value.size;
};

const pushNewItem = () => {
  if (items.value === loading || items.value === undefined) return;
  items.value = items.value.push({
    num: items.value.size + 1,
    status: "USABLE",
    lastHistory: null
  });
};

const popItem = () => {
  if (items.value === loading || items.value === undefined) return;
  items.value = items.value.pop();
};
</script>

<template>
  <section class="item-list">
    <template v-if="items !== loading && items !== undefined">
      <ItemListCell
        v-for="(item, index) in items"
        :key="index"
        v-bind="{ item: item, isNew: index >= selectedStuffItemsSize() }"
        @pop-item="popItem"
      ></ItemListCell>
      <button
        v-if="viewMode === 'EDIT' || viewMode === 'ADD'"
        type="button"
        class="btn btn-outline-primary btn mx-3"
        @click="pushNewItem()"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;

  .cell {
    $list-cell-height: 4rem;
    $padding-size: map-get($spacers, 3);
    position: relative;

    height: $list-cell-height;
    padding-left: $padding-size;
    padding-right: $padding-size;
  }
}
</style>
