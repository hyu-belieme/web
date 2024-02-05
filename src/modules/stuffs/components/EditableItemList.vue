<script setup lang="ts">
import { NIL as NIL_UUID } from 'uuid';
import { ref } from 'vue';

import ButtonBase from '@common/components/buttons/ButtonBase/ButtonBase.vue';
import PlusIcon from '@common/components/icons/PlusIcon/PlusIcon.vue';
import ItemInfoOnly from '@common/models/ItemInfoOnly';

import EditableItemCell from '@^stuffs/components/EditableItemCell.vue';
import ItemListFrame from '@^stuffs/components/stuff-detail-frames/ItemListFrame.vue';

const props = defineProps<{
  originalItems: ItemInfoOnly[];
}>();

const emits = defineEmits<{
  (e: 'appendItem'): void;
  (e: 'deleteItem', id: string): void;
  (e: 'resetItems'): void;
}>();

const items = ref<ItemInfoOnly[]>(props.originalItems);
emits('resetItems');

function appendItem() {
  items.value.push(
    new ItemInfoOnly({
      id: NIL_UUID,
      num: -1,
      status: 'USABLE',
      lastHistory: null,
    })
  );
  emits('appendItem');
}

function deleteItem(id: string) {
  items.value.pop();
  emits('deleteItem', id);
}
</script>

<template>
  <ItemListFrame>
    <template v-slot:item-list>
      <EditableItemCell
        v-for="(item, index) of items"
        :key="index"
        :item="item"
        :removable="item.num === -1"
        @pop-item="deleteItem(item.id)"
      ></EditableItemCell>
      <ButtonBase type="button" class="w-100" v-bind:color="'light'" @click="appendItem()">
        <PlusIcon :color="'dark'" hover="off"></PlusIcon>
      </ButtonBase>
    </template>
  </ItemListFrame>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 2);
}
</style>
