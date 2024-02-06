import { List } from 'immutable';
import { defineStore } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, ref } from 'vue';

import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import type StuffWithItems from '@common/models/StuffWithItems';

const useStuffEditionStore = defineStore('stuff-edition', () => {
  const MAX_ITEM_NUM = 50;

  const stuffBeforeUpdate = ref<StuffWithItems | undefined>(undefined);

  const newName = ref('');
  const newThumbnail = ref('');
  const newDesc = ref('');
  const newItemCount = ref(0);
  const deletedItemIds = ref<string[]>([]);

  const editionAppliedItems = computed(() => {
    const items = stuffBeforeUpdate.value?.items ?? List([]);
    let newItems = items.filter((e) => deletedItemIds.value.indexOf(e.id) === -1);
    for (let i = 0; i < newItemCount.value; i += 1) {
      newItems = newItems.push(
        new ItemInfoOnly({
          id: NIL_UUID,
          num: 51,
          status: 'USABLE',
          lastHistory: null,
        })
      );
    }

    return newItems;
  });

  const editionAppliedStuffInfo = computed(
    () =>
      new StuffInfoOnly({
        id: stuffBeforeUpdate.value?.id || NIL_UUID,
        name: newName.value,
        thumbnail: newThumbnail.value,
        desc: newDesc.value,
      })
  );

  function setStuffBeforeUpdate(stuff: StuffWithItems | undefined) {
    stuffBeforeUpdate.value = stuff;
  }

  function updateNewName(_newName: string) {
    newName.value = _newName;
  }
  function updateNewThumbnail(_newThumbnail: string) {
    newThumbnail.value = _newThumbnail;
  }
  function updateNewDesc(_newDesc: string) {
    newDesc.value = _newDesc;
  }

  function resetNewItemCount() {
    newItemCount.value = 0;
  }

  function increaseNewItemCount() {
    const items = stuffBeforeUpdate.value?.items ?? List([]);
    const currentItems = items.filter((e) => deletedItemIds.value.indexOf(e.id) === -1);
    if (newItemCount.value + currentItems.size >= MAX_ITEM_NUM) return false;
    newItemCount.value += 1;
    return true;
  }

  function decreaseNewItemCount() {
    if (newItemCount.value <= 0) return;
    newItemCount.value -= 1;
  }

  function resetDeletedItemIds() {
    deletedItemIds.value = [];
  }

  function addDeletedItemId(itemId: string) {
    deletedItemIds.value.push(itemId);
  }

  return {
    newName,
    newThumbnail,
    newDesc,
    newItemCount,
    deletedItemIds,
    editionAppliedItems,
    editionAppliedStuffInfo,
    setStuffBeforeUpdate,
    updateNewName,
    updateNewThumbnail,
    updateNewDesc,
    resetNewItemCount,
    increaseNewItemCount,
    decreaseNewItemCount,
    resetDeletedItemIds,
    addDeletedItemId,
  };
});

export default useStuffEditionStore;
