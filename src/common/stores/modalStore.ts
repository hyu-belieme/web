import { List } from "immutable";
import { defineStore } from "pinia";
import { type Component, markRaw, readonly, ref } from "vue";

export interface Modal {
  key: string;
  component: Component;
  props?: unknown;
  resolve: (value: any, key: string) => void;
  reject: (reason: any, key: string) => void;
}

export const useModalStore = defineStore("modal", () => {
  const modals = ref<List<Modal>>(List([]));
  const _modals = readonly(modals);

  const addModal = (modal: Modal) => {
    let idx = modals.value.findIndex((e) => e.key === modal.key);

    modal.component = markRaw(modal.component);
    if (idx === undefined) {
      modals.value = modals.value.push(modal);
      return;
    }
    modals.value = modals.value.splice(idx, 1, modal);
  };

  function removeModal(key: string) {
    let idx = modals.value.findIndex((e) => e.key === key);
    if (idx === undefined) return;
    modals.value = modals.value.splice(idx, 1);
  }

  return {
    modals: _modals,
    addModal,
    removeModal
  };
});
