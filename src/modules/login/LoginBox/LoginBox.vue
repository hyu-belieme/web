<script setup lang="ts">
const ORIGIN_AND_BASE_URL = window.location.origin + import.meta.env.BASE_URL;
const LOGIN_REDIRECT_PAGE_URL = `${ORIGIN_AND_BASE_URL}login/redirect/`;
const HANYANG_PORTAL_LOGIN_API_URL = `http://api.hanyang.ac.kr/oauth/authorize?client_id=${
  import.meta.env.VITE_HANYANG_API_CLIENT_ID
}&redirect_uri=${LOGIN_REDIRECT_PAGE_URL}&response_type=token&scope=10`;

function redirectToHanyangLogin() {
  window.location.href = HANYANG_PORTAL_LOGIN_API_URL;
}
</script>

<template>
  <section class="login-box">
    <section class="login-box-content">
      <span>로그인 후에 이용 가능합니다.</span>
      <button class="btn btn-primary btn-sm" @click="redirectToHanyangLogin()">
        한양 포탈으로 로그인
      </button>
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
