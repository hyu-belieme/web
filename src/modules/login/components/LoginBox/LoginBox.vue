<script setup lang="ts">
import { useRouter } from 'vue-router';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import useUserTokenStorage from '@common/storages/user-token-storage';

const ORIGIN_AND_BASE_URL = window.location.origin + import.meta.env.BASE_URL;
const LOGIN_REDIRECT_PAGE_URL = `${ORIGIN_AND_BASE_URL}login/redirect/`;
const HANYANG_PORTAL_LOGIN_API_URL = `http://api.hanyang.ac.kr/oauth/authorize?client_id=${
  import.meta.env.VITE_HANYANG_API_CLIENT_ID
}&redirect_uri=${LOGIN_REDIRECT_PAGE_URL}&response_type=token&scope=10`;

function redirectToHanyangLogin() {
  window.location.href = HANYANG_PORTAL_LOGIN_API_URL;
}

const TEST_ACCOUNT_TOKEN = '0899d76f-ad2e-4b1d-9eac-6d75ccfd1e8b';

const router = useRouter();
const userTokenStorage = useUserTokenStorage();

function loginUsingTestAccount() {
  userTokenStorage.setItem(TEST_ACCOUNT_TOKEN);
  router.go(0);
}
</script>

<template>
  <section class="login-box">
    <section class="login-box-content">
      <span>로그인 후에 이용 가능합니다.</span>
      <section class="d-flex flex-row align-items-center gap-2">
        <BasicButton
          :size="'sm'"
          :content="'한양 포탈으로 로그인'"
          @click="redirectToHanyangLogin()"
        >
        </BasicButton>
        <BasicButton
          :size="'sm'"
          color="light"
          :content="'테스트 계정으로 로그인'"
          @click="loginUsingTestAccount()"
        ></BasicButton>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background-color: $white;

  .login-box-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: map-get($map: $spacers, $key: 2);
  }
}
</style>
