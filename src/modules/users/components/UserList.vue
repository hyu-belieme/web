<template>
  <section class="user-list">
    <UserListHeader></UserListHeader>
    <!-- <UserListCell v-for=""></UserListCell> -->
  </section>
</template>

<script setup lang="ts">
import UserListHeader from '@^users/components/UserListHeader.vue';
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}
</style>
