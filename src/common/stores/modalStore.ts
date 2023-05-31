import { List } from 'immutable';
import { defineStore } from 'pinia';
import { markRaw, readonly, ref } from 'vue';

import type Modal from '@common/types/Modal';

const useModalStore = defineStore('modal', () => {
  const modals = ref<List<Modal>>(List([]));

  function addModal(modal: Modal) {
    const idx = modals.value.findIndex((e) => e.key === modal.key);
    const newModal = {
      ...modal,
      component: markRaw(modal.component),
    };

    if (idx === undefined) {
      modals.value = modals.value.push(newModal);
      return;
    }
    modals.value = modals.value.splice(idx, 1, newModal);
  }

  function removeModal(key: string) {
    const idx = modals.value.findIndex((e) => e.key === key);
    if (idx === undefined) return;
    modals.value = modals.value.splice(idx, 1);
  }

  return {
    modals: readonly(modals),
    addModal,
    removeModal,
  };
});

export default useModalStore;
