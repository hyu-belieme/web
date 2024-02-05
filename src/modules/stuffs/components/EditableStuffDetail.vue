<script setup lang="ts">
import { NIL as NIL_UUID } from 'uuid';

import type StuffWithItems from '@common/models/StuffWithItems';

import EditableItemList from '@^stuffs/components/EditableItemList.vue';
import EditableStuffInfo from '@^stuffs/components/EditableStuffInfo.vue';
import StuffDetailFrame from '@^stuffs/components/stuff-detail-frames/StuffDetailFrame.vue';
import useStuffEditionStore from '@^stuffs/stores/stuff-edition-store';

defineProps<{
  originalStuff: StuffWithItems | undefined;
}>();

const emits = defineEmits<{
  (e: 'commitChange'): void;
  (e: 'closeEditMode'): void;
}>();

const stuffEditionStore = useStuffEditionStore();

function deleteItem(id: string) {
  if (id === NIL_UUID) {
    stuffEditionStore.decreaseNewItemCount();
    return;
  }
  stuffEditionStore.addDeletedItemId(id);
}
</script>

<template>
  <section class="w-100 h-100">
    <StuffDetailFrame>
      <template v-slot:stuff-info>
        <EditableStuffInfo
          :original-stuff="originalStuff"
          @name-changed="(val) => stuffEditionStore.updateNewName(val)"
          @thumbnail-changed="(val) => stuffEditionStore.updateNewThumbnail(val)"
          @desc-changed="(val) => stuffEditionStore.updateNewDesc(val)"
          @commit-change="emits('commitChange')"
          @close-edit-mode="emits('closeEditMode')"
        ></EditableStuffInfo>
      </template>
      <template v-slot:item-list>
        <EditableItemList
          :original-items="originalStuff?.items.toArray() ?? []"
          @append-item="() => stuffEditionStore.increaseNewItemCount()"
          @delete-item="(id) => deleteItem(id)"
          @reset-items="() => stuffEditionStore.resetNewItemCount()"
        ></EditableItemList>
      </template>
    </StuffDetailFrame>
  </section>
</template>

<style lang="scss" scoped></style>
