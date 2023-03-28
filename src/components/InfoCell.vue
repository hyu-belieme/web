<template>
  <section class="cell">
    <section class="content">
      <span class="key">대여 요청 시간</span>
      <span class="value">2022년 03월 17일 (금) 오후 1시 08분</span>
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

    .key {
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
