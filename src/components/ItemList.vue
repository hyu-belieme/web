<script setup>
import ItemCell from "@/components/ItemCell.vue";
</script>

<template>
  <section class="item-list">
    <ItemCell
      v-for="item in items"
      key="item"
      v-bind="{ num: item.num, status: item.status, lastHistory: item.lastHistory }"
    ></ItemCell>
  </section>
</template>

<script>
export default {
  name: "ItemList",
  props: ["items"]
};
</script>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;
}
</style>
