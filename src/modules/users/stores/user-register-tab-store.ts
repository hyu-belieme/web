import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserRegisterTab = defineStore('user-register-tab-open', () => {
  const isUserRegisterTabOpened = ref<boolean>(false);

  function openUserRegisterTab() {
    isUserRegisterTabOpened.value = true;
  }

  function closeUserRegisterTab() {
    isUserRegisterTabOpened.value = false;
  }

  return {
    isUserRegisterTabOpened,
    openUserRegisterTab,
    closeUserRegisterTab,
  };
});

export default useUserRegisterTab;
