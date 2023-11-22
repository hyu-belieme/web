<template>
  <section class="user-diff-list">
    <section class="w-100">
      <section class="border-bottom d-flex flex-row align-items-center px-2">
        <section
          class="px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
        >
          <span class="lh-sm">등록하기</span>
        </section>
      </section>
    </section>
    <UserRegisterContent></UserRegisterContent>
  </section>
</template>

<script setup lang="ts">
import UserRegisterContent from '@^users/components/UserRegisterContent.vue';
</script>

<style scoped lang="scss">
.user-diff-list {
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}
</style>
