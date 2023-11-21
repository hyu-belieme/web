<script setup lang="ts"></script>

<template>
  <section class="text-frame">
    <span class="error-title"
      ><span class="primary-color">E</span>RR<span class="primary-color">O</span>R</span
    >
    <span class="error-message">
      데이터를 불러오는데 문제가 발생하였습니다.<br />
      새로고침 후에 다시 이용해 주세요.
    </span>
  </section>
</template>

<style scoped lang="scss">
.text-frame {
  width: 100%;
  height: 100%;

  padding: map-get($spacers, 3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.error-title {
  font-size: $h1-font-size;
  font-weight: $font-weight-semibold;
}

.error-message {
  font-weight: $font-weight-normal;
  color: $gray-700;
}

.primary-color {
  color: $primary;
}
</style>
