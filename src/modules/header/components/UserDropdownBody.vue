<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useModalStore from '@common/components/modals/stores/modal-store';
import type User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserModeStorage from '@common/storages/user-mode-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import ChangeDepartmentModal from '@^header/components/ChangeDepartmentModal.vue';

defineProps<{
  user: User;
}>();
const emit = defineEmits(['closeDropdown']);

const userTokenStorage = useUserTokenStorage();

const loggedInUserStorage = useLoggedInUserStorage();

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);

const changeDeptModal = {
  component: ChangeDepartmentModal,
  props: {
    title: '학과 변경하기',
  },
};

const changeUserModeLabel = computed(() =>
  userMode.value === 'USER' ? '관리자 모드로' : '사용자 모드로'
);

function showChangeDeptModal() {
  emit('closeDropdown');
  modalStore.addModal(changeDeptModal);
}

function changeUserMode() {
  emit('closeDropdown');
  if (userMode.value === 'USER') userModeStorage.set('STAFF');
  else userModeStorage.set('USER');
}

function logout() {
  emit('closeDropdown');
  userTokenStorage.removeItem();
  loggedInUserStorage.removeItem();
}

function getPermissionOfLoggedInUser() {
  return loggedInUserStorage.getPermissionOfLoggedInUser(curDeptId.value || '');
}
</script>

<template>
  <li>
    <a class="dropdown-item user-info d-flex flex-column flex-gap-2">
      <span class="user-name">{{ user.name }}</span>
      <section class="user-sub-info">
        <span>{{ user.university.name }} / {{ user.studentId }}</span>
      </section>
    </a>
  </li>
  <li><hr class="dropdown-divider" /></li>
  <li><a class="dropdown-item" @click="showChangeDeptModal()">학과 변경하기</a></li>
  <li v-if="hasHigherAuthorityPermission(getPermissionOfLoggedInUser(), 'STAFF')">
    <a class="dropdown-item" @click="changeUserMode()">{{ changeUserModeLabel }}</a>
  </li>
  <li><a class="dropdown-item" @click="logout()" href="/login">로그아웃</a></li>
</template>

<style scoped lang="scss">
@import '@common/components/dropdowns/styles/main';

.user-info {
  &:hover,
  &:focus {
    color: var(--#{$prefix}dropdown-link-color);
    text-decoration: if($link-decoration == none, null, none);
    @include gradient-bg(var(--#{$prefix}dropdown-link-bg));
  }

  &.active,
  &:active {
    color: var(--#{$prefix}dropdown-link-color);
    text-decoration: none;
    @include gradient-bg(var(--#{$prefix}dropdown-link-bg));
  }
}

.user-sub-info {
  font-size: $font-size-xs;
  font-weight: $font-weight-light;
}
</style>
