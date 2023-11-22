<template>
  <section class="h-100 d-flex flex-column gap-2">
    <UserRegisterTab v-if="isUserRegisterTabOpened"></UserRegisterTab>
    <UserDiffListTab class="flex-grow-1"></UserDiffListTab>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import UserDiffListTab from '@^users/components/UserDiffListTab.vue';
import UserRegisterTab from '@^users/components/UserRegisterTab.vue';
import useUserRegisterTab from '@^users/stores/user-register-tab-store';

const userRegisterTabStore = useUserRegisterTab();
const { isUserRegisterTabOpened } = storeToRefs(userRegisterTabStore);
</script>

<style scoped lang="scss"></style>
