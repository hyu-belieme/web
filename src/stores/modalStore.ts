import { defineStore } from "pinia";
import { List } from "immutable";
import { ref, type Component, markRaw, readonly } from "vue";

export interface Modal {
  key: string;
  component: Component;
  props?: unknown;
  resolve: () => void;
  reject: () => void;
}

export const useModalStore = defineStore("modal", () => {
  const modals = ref<List<Modal>>(List([]));

  const addModal = (modal: Modal) => {
    let idx = modals.value.findIndex((e) => e.key == modal.key);

    modal.component = markRaw(modal.component);
    if (idx == undefined) {
      modals.value = modals.value.push(modal);
      return;
    }
    modals.value = modals.value.splice(idx, 1, modal);
  };

  function removeModal(key: string) {
    let idx = modals.value.findIndex((e) => e.key == key);
    if (idx == undefined) return;
    modals.value = modals.value.splice(idx, 1);
  }

  const _modals = readonly(modals);
  return {
    modals: _modals,
    addModal,
    removeModal
  };
});
