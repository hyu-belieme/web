import { Queue } from "queue-typescript";
import { computed, readonly, ref } from "vue";
import { defineStore } from "pinia";
import { List } from "immutable";

export interface ButtonInModal {
  label: string;
  event: () => void;
}

interface _Modal {
  id: string;
  title?: string;
  content?: string;
  resolveBtn?: ButtonInModal;
  rejectBtn?: ButtonInModal;
  templateHeader?: string;
  templateBody?: string;
  templateFooter?: string;
}

export const useModalStore = defineStore("modal", () => {
  const modals = ref<List<_Modal>>(List([]));
  const _queueForShow = ref(new Queue<string>());
  const _queueForHide = ref(new Queue<string>());

  const addModal = (modal: _Modal) => {
    let idx = modals.value.findIndex((e) => e.id == modal.id);
    if (idx == undefined) {
      modals.value = modals.value.push(modal);
      return;
    }
    modals.value = modals.value.splice(idx, 1, modal);
  };

  function removeModal(modal: _Modal) {
    let idx = modals.value.findIndex((e) => e.id == modal.id);
    if (idx == undefined) return;
    modals.value = modals.value.splice(idx, 1);
  }

  function showModal(id: string) {
    _queueForShow.value.enqueue(id);
  }

  function hideModal(id: string) {
    _queueForHide.value.enqueue(id);
  }

  function commitShow() {
    _queueForShow.value.dequeue();
  }

  function commitHide() {
    _queueForHide.value.dequeue();
  }

  const toShow = computed(() => _queueForShow.value.front);
  const toShowCount = computed(() => _queueForShow.value.length);

  const toHide = computed(() => _queueForHide.value.front);
  const toHideCount = computed(() => _queueForHide.value.length);

  return {
    modals,
    addModal,
    removeModal,
    showModal,
    hideModal,
    toShow,
    toShowCount,
    commitShow,
    toHide,
    toHideCount,
    commitHide
  };
});
