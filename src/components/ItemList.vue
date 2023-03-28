<script setup>
import ItemCell from "@/components/ItemCell.vue";
</script>

<template>
  <section class="item-list">
    <ItemCell v-bind="{ num: 1, status: 'USABLE' }"></ItemCell>
    <ItemCell v-bind="{ num: 2, status: 'UNUSABLE' }"></ItemCell>
    <ItemCell v-bind="{ num: 3, status: 'INACTIVE' }"></ItemCell>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;
}
</style>
