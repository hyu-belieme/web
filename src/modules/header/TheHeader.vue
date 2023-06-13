<script setup lang="ts">
import SettingDropdown from '@^header/components/SettingDropdown/SettingDropdown.vue';
</script>

<template>
  <section class="flex-grow-0">
    <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
  </section>
  <nav class="flex-grow-1 d-flex flex-row align-items-center ms-5">
    <RouterLink to="/stuffs" class="m-4">물품목록</RouterLink>
    <RouterLink to="/histories" class="m-4">대여기록</RouterLink>
    <RouterLink to="/bulletin" class="m-4">문의게시판</RouterLink>
    <RouterLink to="/users" class="m-4">유저관리</RouterLink>
  </nav>
  <section class="flex-grow-0">
    <i class="icon bi bi-person" data-bs-toggle="dropdown" aria-expanded="false"></i>
    <SettingDropdown></SettingDropdown>
  </section>
</template>

<style lang="scss">
.logo {
  height: $header-font-size * $header-line-height;
}

.icon {
  font-size: $header-font-size * 1.3;
}

.dept-list {
  display: flex;
  flex-direction: column;

  overflow: scroll;
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
