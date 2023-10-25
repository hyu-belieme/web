<script setup lang="ts">
import BasicDropdown from '@common/components/dropdowns/BasicDropdown/BasicDropdown.vue';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';

import UserDropdownBody from '@^header/components/UserDropdownBody/UserDropdownBody.vue';
import UserIcon from '@^header/components/UserIcon.vue';

const { loggedInUser } = useLoggedInUserStorage();
</script>

<template>
  <section class="d-flex flex-row align-items-center w-100 ps-5 pe-5 pt-2 pb-2 border-bottom">
    <section class="flex-grow-0">
      <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
    </section>
    <nav class="flex-grow-1 d-flex flex-row align-items-center ms-4">
      <RouterLink to="/stuffs" class="ms-4 me-4">물품목록</RouterLink>
      <RouterLink to="/histories" class="ms-4 me-4">대여기록</RouterLink>
      <RouterLink to="/bulletin" class="ms-4 me-4">문의게시판</RouterLink>
      <RouterLink to="/users" class="ms-4 me-4">유저관리</RouterLink>
    </nav>
    <section class="flex-grow-0">
      <BasicDropdown v-bind:align="'right'" v-bind:type="'hover'">
        <template v-slot:trigger>
          <UserIcon></UserIcon>
        </template>
        <template v-slot:menu="{ closeDropdown }">
          <UserDropdownBody
            v-bind:user="loggedInUser"
            @closeDropdown="closeDropdown"
          ></UserDropdownBody>
        </template>
      </BasicDropdown>
    </section>
  </section>
</template>

<style lang="scss">
@import '@common/components/dropdowns/styles/main';

.logo {
  height: $header-font-size * $header-line-height * 1.25;
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

  &:hover {
    color: $gray-700;
  }
}

nav a.router-link-exact-active {
  color: $primary;
}
</style>
