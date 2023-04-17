import { defineStore } from "pinia";
import { readonly, ref } from "vue";

export const useUserTokenStore = defineStore("userToken", () => {
  const userToken = ref("2aa35846-913a-47b5-ac44-b47a9481f2fa");

  function changeUserToken(token: string) {
    userToken.value = token;
  }

  const $userToken = readonly(userToken);
  return {
    userToken: $userToken,
    changeUserToken
  };
});
