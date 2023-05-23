import { defineStore } from "pinia";
import { NIL as NIL_UUID } from "uuid";
import { readonly, ref } from "vue";

export const useHistoryStore = defineStore("history", () => {
  const selectedId = ref<string>(NIL_UUID);

  const updateSelectedId = (id: string) => {
    selectedId.value = id;
  };

  const $selectedId = readonly(selectedId);

  return {
    selectedId: $selectedId,
    updateSelectedId
  };
});
