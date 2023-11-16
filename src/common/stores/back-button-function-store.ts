import { defineStore } from 'pinia';
import { ref } from 'vue';

const useBackButtonFunction = defineStore('back-button-function', () => {
  const backButtonFunction = ref<(() => void) | undefined>(undefined);

  function updateBackButtonFunction(_backButtonFunction: (() => void) | undefined) {
    backButtonFunction.value = _backButtonFunction;
  }

  return {
    backButtonFunction,
    updateBackButtonFunction,
  };
});

export default useBackButtonFunction;
