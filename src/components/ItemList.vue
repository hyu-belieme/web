<script setup lang="ts">
import ItemCell from "@/components/ItemCell.vue";
import type Item from "@/models/item/Item";
import { useStuffStore } from "@/stores/stuffStore";
import { storeToRefs } from "pinia";

const stuffStore = useStuffStore();
const { selectedStuffItems } = storeToRefs(stuffStore);
</script>

<template>
  <section class="item-list">
    <ItemCell
      v-for="(item, index) in (selectedStuffItems as Item[])"
      :key="index"
      v-bind="{ item: item }"
    ></ItemCell>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;
}
</style>
