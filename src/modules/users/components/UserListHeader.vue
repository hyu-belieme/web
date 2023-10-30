<template>
  <section class="d-flex flex-column w-100 border-bottom">
    <UserListHeaderFilter></UserListHeaderFilter>
    <UserListHeaderLabel></UserListHeaderLabel>
  </section>
</template>

<script setup lang="ts">
import UserListHeaderFilter from '@^users/components/UserListHeaderFilter.vue';
import UserListHeaderLabel from '@^users/components/UserListHeaderLabel.vue';
</script>

<style scoped lang="scss"></style>
