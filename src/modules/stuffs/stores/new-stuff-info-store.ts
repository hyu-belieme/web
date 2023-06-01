import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

const useNewStuffInfo = defineStore('newStuffInfo', () => {
  const MAX_ITEM_NUM = 50;

  const newName = ref('');
  const newThumbnail = ref('');
  const newDesc = ref('');
  const newAmount = ref(0);

  function updateNewName(_newName: string) {
    newName.value = _newName;
  }
  function updateNewThumbnail(_newThumbnail: string) {
    newThumbnail.value = _newThumbnail;
  }
  function updateNewDesc(_newDesc: string) {
    newDesc.value = _newDesc;
  }

  function resetNewAmount() {
    newAmount.value = 0;
  }

  function increaseNewAmount() {
    if (newAmount.value >= MAX_ITEM_NUM) return;
    newAmount.value += 1;
  }

  function decreaseNewAmount() {
    if (newAmount.value <= 0) return;
    newAmount.value -= 1;
  }

  return {
    newName: readonly(newName),
    newThumbnail: readonly(newThumbnail),
    newDesc: readonly(newDesc),
    newAmount: readonly(newAmount),
    updateNewName,
    updateNewThumbnail,
    updateNewDesc,
    resetNewAmount,
    increaseNewAmount,
    decreaseNewAmount,
  };
});

export default useNewStuffInfo;
