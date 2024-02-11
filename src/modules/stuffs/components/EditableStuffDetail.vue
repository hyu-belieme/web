<script setup lang="ts">
import { List } from 'immutable';
import { NIL as NIL_UUID } from 'uuid';
import { computed, ref, toRef } from 'vue';

import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffWithItems from '@common/models/StuffWithItems';

import EditableItemList from '@^stuffs/components/EditableItemList.vue';
import EditableStuffInfo from '@^stuffs/components/EditableStuffInfo.vue';
import StuffDetailFrame from '@^stuffs/components/stuff-detail-frames/StuffDetailFrame.vue';

const props = defineProps<{
  isLoading: boolean;
  stuff: StuffWithItems;
}>();

const emits = defineEmits<{
  (e: 'commitChange'): void;
  (e: 'closeEditMode'): void;
}>();

const isLoading = toRef(props, 'isLoading');

const MAX_ITEM_NUM = 50;

const newName = ref(props.stuff.name);
const newThumbnail = ref(props.stuff.thumbnail);
const newDesc = ref(props.stuff.desc);
const newItemCount = ref(0);
const deletedItemIds = ref<string[]>([]);

const editionAppliedItems = computed(() => {
  const items = props.stuff.items.toArray();
  const newItems = items.filter((e) => deletedItemIds.value.indexOf(e.id) === -1);
  for (let i = 0; i < newItemCount.value; i += 1) {
    newItems.push(
      new ItemInfoOnly({
        id: NIL_UUID,
        num: -1,
        status: 'USABLE',
        lastHistory: null,
      })
    );
  }

  return newItems;
});

const editionAppliedStuff = computed(
  () =>
    new StuffWithItems({
      ...props.stuff,
      name: newName.value,
      thumbnail: newThumbnail.value,
      desc: newDesc.value,
      items: List(editionAppliedItems.value),
    })
);

function increaseNewItemCount() {
  const items = props.stuff.items.toArray();
  const currentItems = items.filter((e) => deletedItemIds.value.indexOf(e.id) === -1);
  if (newItemCount.value + currentItems.length >= MAX_ITEM_NUM) return false;
  newItemCount.value += 1;
  return true;
}

function decreaseNewItemCount() {
  if (newItemCount.value <= 0) return;
  newItemCount.value -= 1;
}

function addDeletedItemId(itemId: string) {
  deletedItemIds.value.push(itemId);
}

function deleteItem(id: string) {
  if (id === NIL_UUID) {
    decreaseNewItemCount();
    return;
  }
  addDeletedItemId(id);
}

defineExpose({
  getNewStuff: () => editionAppliedStuff.value,
  getNewItemCount: () => newItemCount.value,
  getDeletedItemIds: () => deletedItemIds.value,
});
</script>

<template>
  <section class="w-100 h-100">
    <LoadingView v-if="isLoading" />
    <StuffDetailFrame v-else>
      <template v-slot:stuff-info>
        <EditableStuffInfo
          :stuff="editionAppliedStuff"
          @name-changed="(val) => (newName = val)"
          @thumbnail-changed="(val) => (newThumbnail = val)"
          @desc-changed="(val) => (newDesc = val)"
          @commit-change="emits('commitChange')"
          @close-edit-mode="emits('closeEditMode')"
        ></EditableStuffInfo>
      </template>
      <template v-slot:item-list>
        <EditableItemList
          :items="editionAppliedItems"
          @append-item="() => increaseNewItemCount()"
          @delete-item="(id) => deleteItem(id)"
        ></EditableItemList>
      </template>
    </StuffDetailFrame>
  </section>
</template>

<style lang="scss" scoped></style>
