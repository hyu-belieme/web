<script setup lang="ts">
defineProps<{
  keyword: string;
  value: string;
}>();
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="keyword">{{ keyword }}</span>
      <span class="value">{{ value }}</span>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 2rem;
  $padding-size: map-get($spacers, 3);
  position: relative;
  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 2);
    align-items: center;

    .keyword {
      line-height: $list-cell-height;
      font-size: $h6-font-size;
      flex-grow: 1;
    }

    .value {
      line-height: $list-cell-height;
      font-size: $h6-font-size;
    }
  }

  .division-line {
    $position-bottom: map-get($spacers, 1);

    width: calc(100% - 2 * $padding-size);

    border-top: 1px solid $gray-200;
    position: absolute;
    bottom: $position-bottom;
  }
}
</style>
