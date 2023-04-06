import { Queue } from "queue-typescript";
import { computed, readonly, ref } from "vue";
import { defineStore } from "pinia";

interface _Modal {
  id: string;
  title?: string;
  content?: string;
  posBtnText?: string;
  negBtnText?: string;
  templateHeader?: string;
  templateBody?: string;
  templateFooter?: string;
}

export const useModalStore = defineStore("modal", () => {
  const _modals = ref<_Modal[]>([]);
  const _queueForShow = ref(new Queue<string>());
  const _queueForHide = ref(new Queue<string>());

  const addModal = (modal: _Modal) => {
    let idx = _modals.value.findIndex((e) => e.id == modal.id);
    if (idx == undefined) {
      _modals.value.push(modal);
      return;
    }
    _modals.value.splice(idx, 1, modal);
  };

  function removeModal(modal: _Modal) {
    let idx = _modals.value.findIndex((e) => e.id == modal.id);
    if (idx == undefined) return;
    _modals.value.splice(idx, 1);
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

  const modals = readonly(_modals);

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
