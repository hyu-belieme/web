<script setup>
import Tag from "@/components/Tag.vue";
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="name">{{ name }} #{{ num }}</span>
      <section class="tags">
        <Tag v-bind="{ color: 'green', size: 6, content: requester }"></Tag>
        <Tag v-bind="{ color: 'orange', size: 6, content: timestamp }"></Tag>
      </section>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<script>
export default {
  name: "HistoryCell",
  props: ["name", "num", "requester", "timestamp"]
};
</script>

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

    .name {
      line-height: $list-cell-height;
      font-size: $h6-font-size;
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
