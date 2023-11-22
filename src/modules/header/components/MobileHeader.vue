<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import ChevronIcon from '@common/components/icons/ChevronIcon/ChevronIcon.vue';

import MobileNavigationBar from '@^header/components/MobileNavigationBar.vue';
import UserDropdown from '@^header/components/UserDropdown.vue';

const route = useRoute();
const isLoggedIn = computed(() => {
  return !(route.path === '/' || route.path.startsWith('/login'));
});
</script>

<template>
  <section class="w-100 px-3 py-2 d-flex flex-column gap-2">
    <section class="w-100 d-flex flex-row align-items-center justify-content-between">
      <ChevronIcon direction="left" class="invisible"></ChevronIcon>
      <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
      <UserDropdown :class="!isLoggedIn ? 'invisible' : ''"></UserDropdown>
    </section>
    <MobileNavigationBar></MobileNavigationBar>
  </section>
</template>

<style lang="scss">
.logo {
  height: $header-font-size * $header-line-height * 1.25;
}
</style>
