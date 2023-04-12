<script setup lang="ts">
import { useModeStore } from "@common/stores/modeStore";
import { loading, type Loading } from "@common/types/Loading";
import type { ItemNestedToStuff } from "@common/types/Models";

import ItemListCell from "@modules/stuffs/components/DetailStuffItemListCell/DetailStuffItemListCell.vue";
import { useStuffStore } from "@modules/stuffs/stores/stuffStore";

import { List } from "immutable";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const modeStore = useModeStore();
const { detailStuffMode } = storeToRefs(modeStore);

const stuffStore = useStuffStore();
const { selectedStuffItems } = storeToRefs(stuffStore);
const items = ref<Loading | List<ItemNestedToStuff> | undefined>(undefined);
items.value = selectedStuffItems.value;

watch(selectedStuffItems, (newVal) => {
  items.value = newVal;
});

watch(detailStuffMode, (newVal) => {
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
      v-for="(item, index) in (items as List<ItemNestedToStuff>)"
      :key="index"
      v-bind="{ item: item, isNew: index >= (selectedStuffItems as List<ItemNestedToStuff>).size }"
      @pop-item="popItem"
    ></ItemListCell>
    <button
      v-if="detailStuffMode == 'EDIT' || detailStuffMode == 'ADD'"
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
