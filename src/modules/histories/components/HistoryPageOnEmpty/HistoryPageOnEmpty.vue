<script setup lang="ts"></script>

<template>
  <section class="empty-page">
    <section class="empty-page-content">
      <span class="text-center">아직 물품 대여 기록이 없습니다.</span>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.empty-page {
  position: relative;
  width: 100%;
  height: 100%;

  background-color: $white;

  .empty-page-content {
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
