<script setup lang="ts">
import { loading, type Loading } from "@common/types/Loading";
import type { ItemInfoOnly } from "@common/types/Models";

import ItemListCell from "@^stuffs/components/DetailStuffItemListCell/DetailStuffItemListCell.vue";
import { useDetailStuffViewModeStore } from "@^stuffs/stores/DetailStuffViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { List } from "immutable";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const viewModeStore = useDetailStuffViewModeStore();
const viewMode = storeToRefs(viewModeStore).detailStuffViewMode;

const stuffStore = useStuffStore();
const { selectedStuffItems } = storeToRefs(stuffStore);
const items = ref<Loading | List<ItemInfoOnly> | undefined>(undefined);
items.value = selectedStuffItems.value;

watch(selectedStuffItems, (newVal) => {
  items.value = newVal;
});

watch(viewMode, (newVal) => {
  if (newVal == "SHOW") {
    items.value = selectedStuffItems.value;
  } else if (newVal == "ADD") {
    items.value = List();
  }
});

function pushNewItem() {
  if (items.value == loading || items.value == undefined) return;
  items.value = items.value.push({
    num: items.value.size + 1,
    status: "USABLE",
    lastHistory: null
  });
}

const popItem = () => {
  if (items.value == loading || items.value == undefined) return;
  items.value = items.value.pop();
};
</script>

<template>
  <section class="item-list">
    <ItemListCell
      v-for="(item, index) in (items as List<ItemInfoOnly>)"
      :key="index"
      v-bind="{ item: item, isNew: index >= (selectedStuffItems as List<ItemInfoOnly>).size }"
      @pop-item="popItem"
    ></ItemListCell>
    <button
      v-if="viewMode == 'EDIT' || viewMode == 'ADD'"
      type="button"
      class="btn btn-outline-primary btn mx-3"
      @click="pushNewItem()"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
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
