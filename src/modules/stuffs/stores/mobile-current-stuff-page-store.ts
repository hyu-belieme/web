import { defineStore } from 'pinia';
import { ref } from 'vue';

const useMobileCurrentStuffPage = defineStore('mobile-current-stuff-page', () => {
  const mobileCurrentStuffPage = ref<'LIST' | 'DETAIL'>('LIST');

  function changeMobileCurrentStuffPage(mode: 'LIST' | 'DETAIL') {
    mobileCurrentStuffPage.value = mode;
  }

  return {
    mobileCurrentStuffPage,
    changeMobileCurrentStuffPage,
  };
});

export default useMobileCurrentStuffPage;
