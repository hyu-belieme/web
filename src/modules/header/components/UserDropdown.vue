<template>
  <BasicDropdown v-bind:align="'right'" v-bind:type="'hover'">
    <template v-slot:trigger>
      <section class="p-1">
        <UserIcon hover="off"></UserIcon>
      </section>
    </template>
    <template v-slot:menu="{ closeDropdown }">
      <UserDropdownBody
        v-bind:user="loggedInUser"
        @closeDropdown="closeDropdown"
      ></UserDropdownBody>
    </template>
  </BasicDropdown>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BasicDropdown from '@common/components/dropdowns/BasicDropdown/BasicDropdown.vue';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';

import UserDropdownBody from '@^header/components/UserDropdownBody.vue';
import UserIcon from '@^header/components/UserIcon.vue';

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUser } = storeToRefs(loggedInUserStorage);
</script>

<style lang="scss" scoped></style>
