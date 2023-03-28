<script setup>
import ItemCell from "@/components/ItemCell.vue";
</script>

<template>
  <section class="item-list">
    <ItemCell></ItemCell>
    <ItemCell></ItemCell>
    <ItemCell></ItemCell>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;
}
</style>
