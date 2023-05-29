import { defineStore } from "pinia";
import { ref } from "vue";

export const useNewStuffInfo = defineStore("newStuffInfo", () => {
  const MAX_ITEM_NUM = 50;

  const newName = ref("");
  const newThumbnail = ref("");
  const newDesc = ref("");
  const newAmount = ref(0);

  function updateNewName($newName: string) {
    newName.value = $newName;
  }
  function updateNewThumbnail($newThumbnail: string) {
    newThumbnail.value = $newThumbnail;
  }
  function updateNewDesc($newDesc: string) {
    newDesc.value = $newDesc;
  }

  const resetNewAmount = () => {
    newAmount.value = 0;
  };

  const increaseNewAmount = () => {
    if (newAmount.value >= MAX_ITEM_NUM) return;
    newAmount.value++;
  };

  const decreaseNewAmount = () => {
    if (newAmount.value <= 0) return;
    newAmount.value--;
  };

  return {
    newName,
    newThumbnail,
    newDesc,
    newAmount,
    updateNewName,
    updateNewThumbnail,
    updateNewDesc,
    resetNewAmount,
    increaseNewAmount,
    decreaseNewAmount
  };
});
