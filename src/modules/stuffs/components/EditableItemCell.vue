<script setup lang="ts">
import MinusButton from '@common/components/buttons/MinusButton/MinusButton.vue';
import type ItemInfoOnly from '@common/models/ItemInfoOnly';

import ItemListCellFrame from '@^stuffs/components/stuff-detail-frames/ItemListCellFrame.vue';

defineProps<{
  item: ItemInfoOnly;
  removable: boolean;
}>();

const emit = defineEmits<{
  (e: 'popItem'): void;
}>();
</script>

<template>
  <ItemListCellFrame :item="item">
    <template v-slot:buttons>
      <MinusButton
        size="xs"
        color="danger"
        :disabled="!removable"
        :onClick="removable ? () => emit('popItem') : () => {}"
      >
      </MinusButton>
    </template>
  </ItemListCellFrame>
</template>

<style lang="scss" scoped>
@import '@common/components/dropdowns/styles/main';
</style>
