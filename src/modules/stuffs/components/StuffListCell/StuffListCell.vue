<script setup lang="ts">
import InfoTag from "@common/components/InfoTag/InfoTag.vue";
import type { Stuff } from "@common/types/Models";

defineProps<{
  stuff: Stuff;
  selected: boolean;
}>();
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="thumbnail">{{ stuff.thumbnail }}</span>
      <span class="name">{{ stuff.name }}</span>
      <section class="tags">
        <InfoTag
          v-if="stuff.count <= 0"
          v-bind="{ color: 'red', size: 6, content: '남지 않음' }"
        ></InfoTag>
        <InfoTag
          v-else
          v-bind="{ color: 'blue', size: 6, content: stuff.count + '개 남음' }"
        ></InfoTag>
      </section>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 4rem;
  $padding-size: map-get($spacers, 3);
  position: relative;

  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  &.selected {
    background-color: $gray-200;
  }

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .thumbnail {
      line-height: $list-cell-height;
      font-size: $h2-font-size;
    }

    .name {
      line-height: $list-cell-height;
      font-size: $h5-font-size;
      flex-grow: 1;
    }

    .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: map-get($spacers, 1);
    }
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
