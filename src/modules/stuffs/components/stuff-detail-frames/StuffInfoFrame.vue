<script setup lang="ts"></script>

<template>
  <section class="stuff-detail">
    <section class="stuff-info">
      <section class="thumbnail">
        <slot name="thumbnail"></slot>
      </section>
      <section class="label-and-desc">
        <section class="label">
          <slot name="label"></slot>
        </section>
        <section class="desc fs-xs fw-light">
          <slot name="desc"></slot>
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stuff-info {
  width: 100%;
  height: 10rem;

  display: flex;
  flex-direction: row;

  gap: map-get($map: $spacers, $key: 2);

  .thumbnail {
    width: 10rem;
    height: 10rem;
    font-size: 8rem;
  }

  .label-and-desc {
    height: 100%;

    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    gap: map-get($map: $spacers, $key: 2);

    .label {
      flex-grow: 0;
    }

    .desc {
      flex-grow: 1;

      overflow: scroll;
    }
  }
}
</style>
