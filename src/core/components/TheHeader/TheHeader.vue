<script setup lang="ts">
import { useModeStore } from "@common/stores/modeStore";
import { storeToRefs } from "pinia";

const modeStore = useModeStore();
const { userMode } = storeToRefs(modeStore);

const changeUserMode = () => {
  if (userMode.value == "USER") modeStore.changeUserMode("STAFF");
  else modeStore.changeUserMode("USER");
};
</script>

<template>
  <section class="flex-grow-0">
    <img class="logo" src="@core/assets/images/belieme_logo_en.png" />
  </section>
  <nav class="flex-grow-1 d-flex flex-row align-items-center ms-5">
    <RouterLink to="/stuffs" class="m-4">물품목록</RouterLink>
    <RouterLink to="/histories" class="m-4">대여기록</RouterLink>
    <RouterLink to="/bulletin" class="m-4">문의게시판</RouterLink>
    <RouterLink to="/users" class="m-4">유저관리</RouterLink>
  </nav>
  <section class="flex-grow-0">
    <i class="icon bi bi-person" @click="changeUserMode()"></i>
  </section>
</template>

<style lang="scss">
.logo {
  height: $header-font-size * $header-line-height;
}

.icon {
  font-size: $header-font-size * 1.3;
}

nav a {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: $body-color;
}

nav a.router-link-exact-active {
  color: $primary;
}
</style>
