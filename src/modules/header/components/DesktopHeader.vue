<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DesktopNavigationBar from '@^header/components/DesktopNavigationBar.vue';
import UserDropdown from '@^header/components/UserDropdown.vue';

const route = useRoute();
const isLoggedIn = computed(() => {
  return !(route.path === '/' || route.path.startsWith('/login'));
});
</script>

<template>
  <section class="d-flex flex-row align-items-center w-100 ps-5 pe-5 pt-2 pb-2 border-bottom">
    <section class="flex-grow-0">
      <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
    </section>
    <DesktopNavigationBar></DesktopNavigationBar>
    <section v-if="isLoggedIn" class="flex-grow-0">
      <UserDropdown></UserDropdown>
    </section>
  </section>
</template>

<style lang="scss">
.logo {
  height: $header-font-size * $header-line-height * 1.25;
}
</style>
