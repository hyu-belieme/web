import { defineStore } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { readonly, ref } from 'vue';

const useHistorySelectedStore = defineStore('historySelected', () => {
  const selectedId = ref<string>(NIL_UUID);

  function updateSelectedId(id: string) {
    selectedId.value = id;
  }

  const $selectedId = readonly(selectedId);

  return {
    selectedId: $selectedId,
    updateSelectedId,
  };
});

export default useHistorySelectedStore;
