import { defineStore } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { readonly, ref } from 'vue';

const useStuffSelectedStore = defineStore('stuffSelected', () => {
  const selectedId = ref<string>(NIL_UUID);

  function updateSelectedId(id: string) {
    selectedId.value = id;
  }

  return {
    selectedId: readonly(selectedId),
    updateSelectedId,
  };
});

export default useStuffSelectedStore;
