<script setup lang="ts">
import type Department from '@common/models/Department';

defineProps<{
  dept: Department;
  selected: boolean;
}>();
</script>

<template>
  <section class="cell">
    <span v-if="selected" class="name">V&nbsp;&nbsp;{{ dept.name }}</span>
    <span v-else class="name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ dept.name }}</span>
    <div class="division-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 2rem;
  $padding-size: map-get($spacers, 1);
  position: relative;

  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  .name {
    line-height: $list-cell-height;
    font-size: $h5-font-size;
  }

  .division-line {
    $position-bottom: -1;

    width: calc(100% - 2 * $padding-size);

    border-bottom: 1px solid $body-bg;
    position: absolute;
    bottom: $position-bottom;
  }
}
</style>
