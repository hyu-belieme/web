<template>
  <section class="w-100 h-100 d-flex flex-column gap-2">
    <BasicSearchBox></BasicSearchBox>
    <UserList></UserList>
  </section>
</template>

<script setup lang="ts">
import BasicSearchBox from '@common/components/searchboxes/BasicSearchBox/BasicSearchBox.vue';

import UserList from '@^users/components/UserList.vue';
</script>

<style scoped lang="scss"></style>
