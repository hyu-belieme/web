<script setup lang="ts">
import UserDiffListAndRegisterTab from '@^users/components/UserDiffListAndRegisterTab.vue';
import UserListAndSearchBox from '@^users/components/UserListAndSearchBox.vue';
</script>

<template>
  <section class="w-100 h-100 d-flex flex-row gap-3">
    <section class="w-50 h-100">
      <UserListAndSearchBox></UserListAndSearchBox>
    </section>
    <section class="w-50 h-100">
      <UserDiffListAndRegisterTab></UserDiffListAndRegisterTab>
    </section>
  </section>
</template>

<style lang="scss" scoped></style>
