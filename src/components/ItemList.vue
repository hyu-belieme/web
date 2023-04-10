<script setup lang="ts">
import ItemCell from "@/components/ItemCell.vue";
import { loading, type Loading } from "@/models/Types";
import type Item from "@/models/item/Item";
import { useModeStore } from "@/stores/modeStore";
import { useStuffStore } from "@/stores/stuffStore";
import { List } from "immutable";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const modeStore = useModeStore();
const { detailStuffMode } = storeToRefs(modeStore);

const stuffStore = useStuffStore();
const { selectedStuffItems } = storeToRefs(stuffStore);
const items = ref<Loading | List<Item> | undefined>(undefined);
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
    <ItemCell
      v-for="(item, index) in (items as List<Item>)"
      :key="index"
      v-bind="{ item: item, isNew: index >= (selectedStuffItems as List<Item>).size }"
      @pop-item="popItem"
    ></ItemCell>
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
