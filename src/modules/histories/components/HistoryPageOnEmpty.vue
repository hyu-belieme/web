<script setup lang="ts"></script>

<template>
  <section class="empty-page">
    <section class="empty-page-content">
      <span class="text-center">아직 물품 대여기록이 없습니다.</span>
      <span class="text-center">나중에 다시 확인해 주세요!</span>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.empty-page {
  position: relative;
  width: 100%;
  height: 100%;

  .empty-page-content {
    color: $gray-700;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
