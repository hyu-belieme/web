<script setup lang="ts"></script>

<template>
  <section class="stuff-detail">
    <section class="stuff-info-frame">
      <slot name="stuff-info"></slot>
    </section>
    <section class="stuff-info-frame">
      <slot name="item-list"></slot>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stuff-detail {
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 2);

  .stuff-info-frame {
    width: 100%;

    flex-grow: 0;
  }

  .item-list-frame {
    width: 100%;

    flex-grow: 1;
  }
}
</style>
