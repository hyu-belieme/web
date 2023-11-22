<template>
  <section class="d-flex flex-column w-100 border-bottom">
    <UserListHeaderFilter></UserListHeaderFilter>
    <section v-if="isUserRegisterTabOpened" class="mt-2 border-top border-bottom only-on-mobile">
      <UserRegisterContent></UserRegisterContent>
    </section>
    <UserListHeaderLabel></UserListHeaderLabel>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import UserListHeaderFilter from '@^users/components/UserListHeaderFilter.vue';
import UserListHeaderLabel from '@^users/components/UserListHeaderLabel.vue';
import UserRegisterContent from '@^users/components/UserRegisterContent.vue';
import useUserRegisterTab from '@^users/stores/user-register-tab-store';

const userRegisterTabStore = useUserRegisterTab();
const { isUserRegisterTabOpened } = storeToRefs(userRegisterTabStore);
</script>

<style scoped lang="scss">
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .only-on-mobile {
    display: block;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .only-on-mobile {
    display: none;
  }
}
</style>
