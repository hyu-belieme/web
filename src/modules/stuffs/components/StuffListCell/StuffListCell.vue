<script setup lang="ts">
import type Stuff from '@common/models/Stuff';

defineProps<{
  stuff: Stuff;
  selected: boolean;
}>();
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="thumbnail">{{ stuff.thumbnail }}</span>
      <section class="name-and-remaining">
        <span class="name">{{ stuff.name }}</span>
        <span class="remaining">{{
          stuff.count === 0 ? '남지 않음' : stuff.count + '개 남음'
        }}</span>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $padding-size: map-get($spacers, 3);
  position: relative;

  padding-left: $padding-size;
  padding-right: $padding-size;

  &.selected,
  &:hover {
    background-color: $gray-100;

    .content {
      .name-and-remaining {
        border-bottom: calc($border-width * 0.5) solid transparent;
      }
    }
  }

  .content {
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .thumbnail {
      width: 3rem;
      height: 3rem;
      font-size: $h2-font-size;
      text-align: center;
    }

    .name-and-remaining {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      margin-left: map-get($spacers, 1);
      margin-right: map-get($spacers, 1);

      border-bottom: calc($border-width * 0.5) solid $border-color;

      .name {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
      }

      .remaining {
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        color: $gray-700;
      }
    }
  }
}
</style>
