<template>
  <section class="user-diff-list">
    <section class="w-100 flex-grow-0">
      <section class="border-bottom d-flex flex-row align-items-center px-2">
        <section
          class="px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
        >
          <span class="lh-sm">변경사항</span>
        </section>
      </section>
    </section>
    <section class="w-100 flex-grow-1">
      <UserDiffListContent></UserDiffListContent>
    </section>
  </section>
</template>

<script setup lang="ts">
import UserDiffListContent from '@^users/components/UserDiffListContent.vue';
</script>

<style scoped lang="scss">
.user-diff-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();

  overflow: scroll;
}
</style>
