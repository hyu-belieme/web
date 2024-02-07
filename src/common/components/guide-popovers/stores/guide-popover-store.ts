import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type GuideType from '@common/components/guide-popovers/types/GuideTypes';

export const useGuidePopoverStore = defineStore('guide-popovers', () => {
  const openedGuidePopovers = ref<GuideType[]>([]);

  const openedGuidePopoverCount = computed(() => openedGuidePopovers.value.length);

  function openGuidePopover(type: GuideType) {
    if (!openedGuidePopovers.value.includes(type)) {
      openedGuidePopovers.value.push(type);
    }
  }

  function closeAllGuidePopover() {
    openedGuidePopovers.value = [];
  }

  return {
    openedGuidePopovers,
    openedGuidePopoverCount,
    openGuidePopover,
    closeAllGuidePopover,
  };
});

export default useGuidePopoverStore;
