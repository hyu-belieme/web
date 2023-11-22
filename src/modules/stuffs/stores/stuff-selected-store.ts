import { defineStore } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { ref } from 'vue';

const useStuffSelectedStore = defineStore('stuffSelected', () => {
  const selectedId = ref<string>(NIL_UUID);

  function updateSelectedId(id: string) {
    selectedId.value = id;
  }

  return {
    selectedId,
    updateSelectedId,
  };
});

export default useStuffSelectedStore;
