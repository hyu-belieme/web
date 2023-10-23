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
  </section>
</template>

<style lang="scss" scoped>
.cell {
  padding: map-get($spacers, 1);
  line-height: $line-height-sm;
  position: relative;

  .content {
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .keyword {
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
    }

    .value {
      font-size: $font-size-sm;
      font-weight: $font-weight-light;
      color: $gray-700;
    }
  }
}
</style>
