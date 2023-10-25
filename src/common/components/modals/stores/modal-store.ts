import { List } from 'immutable';
import { defineStore } from 'pinia';
import { v4 as uuidV4 } from 'uuid';
import { markRaw, readonly, ref } from 'vue';

import type { Modal, ModalWithKey } from '@common/components/modals/types/Modal';

const useModalStore = defineStore('modal', () => {
  const modals = ref<List<ModalWithKey>>(List([]));
  let closeLogic: (e: MouseEvent) => any;

  function addModal(modal: Modal) {
    const newModal = {
      ...modal,
      key: uuidV4(),
      component: markRaw(modal.component),
    };

    if (modals.value.size === 0) {
      window.addEventListener('mouseup', closeLogic);
    }
    modals.value = modals.value.push(newModal);
  }

  function removeModal() {
    modals.value = modals.value.pop();
    if (modals.value.size === 0) {
      window.removeEventListener('mouseup', closeLogic);
    }
  }

  closeLogic = (e: MouseEvent) => {
    const currentModal = modals.value.last();
    if (
      e.target instanceof Element &&
      currentModal !== undefined &&
      !e.target.closest(`*[modal-key='${currentModal.key}']`)
    ) {
      removeModal();
    }
  };

  return {
    modals: readonly(modals),
    addModal,
    removeModal,
  };
});

export default useModalStore;
