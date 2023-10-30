<template>
  <section class="h-100 d-flex flex-column gap-2">
    <UserRegisterTab></UserRegisterTab>
    <UserDiffList class="flex-grow-1"></UserDiffList>
  </section>
</template>

<script setup lang="ts">
import UserDiffList from '@^users/components/UserDiffList.vue';
import UserRegisterTab from '@^users/components/UserRegisterTab.vue';
</script>

<style scoped lang="scss"></style>
