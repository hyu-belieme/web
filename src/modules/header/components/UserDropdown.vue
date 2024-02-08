<template>
  <BasicDropdown v-bind:align="'right'" v-bind:type="'hover'">
    <template v-slot:trigger>
      <section class="p-1">
        <UserIcon hover="off"></UserIcon>
      </section>
    </template>
    <template v-slot:menu="{ closeDropdown }">
      <UserDropdownBody
        :user="user"
        :cur-dept-id="curDeptId"
        @closeDropdown="closeDropdown"
        @logout="$emit('logout')"
      ></UserDropdownBody>
    </template>
  </BasicDropdown>
</template>

<script setup lang="ts">
import BasicDropdown from '@common/components/dropdowns/BasicDropdown/BasicDropdown.vue';
import type User from '@common/models/User';

import UserDropdownBody from '@^header/components/UserDropdownBody.vue';
import UserIcon from '@^header/components/UserIcon.vue';

defineProps<{
  user: User;
  curDeptId: string;
}>();

defineEmits<{
  (e: 'logout'): void;
}>();
</script>

<style lang="scss" scoped></style>
