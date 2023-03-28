<script setup>
import Tag from "@/components/Tag.vue";
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="numbering">1</span>
      <section class="tags">
        <Tag v-bind="{ color: 'green', size: 6, content: '대여 가능' }"></Tag>
      </section>
      <section class="buttons">
        <button class="btn btn-primary btn-sm">대여하기</button>
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

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 2);
    align-items: center;

    .numbering {
      width: $list-cell-height * 0.7;
      height: $list-cell-height * 0.7;

      line-height: $list-cell-height * 0.7;
      font-size: $h2-font-size;
      font-weight: 700;
      text-align: center;

      background-color: black;
      color: white;
    }

    .tags {
      display: flex;
      flex-direction: row;
      flex-grow: 1;

      align-items: center;
      gap: map-get($spacers, 1);
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: map-get($map: $spacers, $key: 2);
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
