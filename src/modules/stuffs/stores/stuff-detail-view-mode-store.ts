import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const useStuffDetailViewModeStore = defineStore('stuffDetailViewMode', () => {
  const stuffDetailViewMode = ref<StuffDetailViewMode>('SHOW');

  function changeStuffDetailViewMode(mode: StuffDetailViewMode) {
    stuffDetailViewMode.value = mode;
  }

  return {
    stuffDetailViewMode: readonly(stuffDetailViewMode),
    changeStuffDetailViewMode,
  };
});

export default useStuffDetailViewModeStore;
