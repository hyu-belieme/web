<script setup lang="ts"></script>

<template>
  <section class="login-page">
    <section class="login-box">
      <section class="login-box-content">
        <span>로그인 후에 이용 가능합니다.</span>
        <button class="btn btn-primary btn-sm">한양 포탈으로 로그인</button>
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
.login-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);

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
}
</style>
