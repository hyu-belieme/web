<template>
  <section class="search-box">
    <MagnifierIcon :color="'gray-400'" class="mx-1"></MagnifierIcon>
    <input type="text" class="form-control" placeholder="물품 이름을 입력해주세요." />
  </section>
</template>

<script setup lang="ts">
import MagnifierIcon from '@common/components/icons/MagnifierIcon/MagnifierIcon.vue';
</script>

<style scoped lang="scss">
.search-box {
  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);

  border: $border-width solid $border-color;
  @include border-radius();

  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus-within {
    border: $border-width solid $primary;
    outline: none;
  }
  background-color: $gray-100;

  input {
    width: 0;
    flex-grow: 1;

    padding-left: map-get($spacers, 1);
    padding-right: map-get($spacers, 1);

    padding-top: map-get($spacers, 2);
    padding-bottom: map-get($spacers, 2);

    line-height: 1;

    border: none;
    background-color: $gray-100;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
