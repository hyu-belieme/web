import { type RemovableRef, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { GUIDE_TYPES } from '@common/components/guide-popovers/types/GuideTypes';

const key = 'guide-flags';

const useGuideFlagsStorage = defineStore(key, () => {
  const guideFlagMap = new Map<string, RemovableRef<boolean>>();
  GUIDE_TYPES.forEach((type) => {
    guideFlagMap.set(type, useStorage<boolean>(type, false, localStorage));
  });

  function getGuideFlag(type: string) {
    return guideFlagMap.get(type);
  }

  function setGuideFlag(type: string, value: boolean) {
    const flag = guideFlagMap.get(type);
    if (flag) {
      flag.value = value;
    }
  }

  return {
    getGuideFlag,
    setGuideFlag,
  };
});
export default useGuideFlagsStorage;
