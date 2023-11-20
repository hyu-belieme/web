<script setup lang="ts">
import { toRef } from 'vue';

import type Item from '@common/models/Item';

import ItemListCell from '@^stuffs/components/ItemListCell.vue';
import ItemListFrame from '@^stuffs/components/stuff-detail-frames/ItemListFrame.vue';

const props = defineProps<{
  items: Item[];
}>();

const items = toRef(props, 'items');
</script>

<template>
  <ItemListFrame>
    <template v-slot:item-list>
      <ItemListCell v-for="(item, index) of items" :key="index" :item="item"></ItemListCell>
    </template>
  </ItemListFrame>
</template>

<style lang="scss" scoped></style>
