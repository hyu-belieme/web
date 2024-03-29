<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';

import User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserModeStorage from '@common/storages/user-mode-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import DesktopHeader from '@^header/components/DesktopHeader.vue';
import MobileHeader from '@^header/components/MobileHeader.vue';

const userTokenStorage = useUserTokenStorage();

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUser } = storeToRefs(loggedInUserStorage);

const parsedLoggedInUser = computed(() => new User(loggedInUser.value));

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);

function logout() {
  userTokenStorage.removeItem();
  loggedInUserStorage.removeItem();
}

watch(userMode, () => {
  if (User.NIL.equals(loggedInUser.value)) {
    return;
  }

  if (
    !hasHigherAuthorityPermission(
      new User(loggedInUser.value).getPermission(curDeptId.value),
      'STAFF'
    )
  ) {
    userModeStorage.set('USER');
  }
});
</script>

<template>
  <div :class="'w-100 desktop-frame ' + (userMode === 'STAFF' ? 'staff-mode-background' : '')">
    <DesktopHeader
      :key="`${loggedInUser.id}${curDeptId}`"
      :logged-in-user="parsedLoggedInUser"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      @logout="logout()"
    ></DesktopHeader>
  </div>
  <div :class="'w-100 mobile-frame ' + (userMode === 'STAFF' ? 'staff-mode-background' : '')">
    <MobileHeader
      :key="`${loggedInUser.id}${curDeptId}`"
      :logged-in-user="parsedLoggedInUser"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      @logout="logout()"
    ></MobileHeader>
  </div>
</template>

<style lang="scss" scoped>
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .mobile-frame {
    display: block;
  }

  .desktop-frame {
    display: none;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .mobile-frame {
    display: none;
  }

  .desktop-frame {
    display: block;
  }
}

.staff-mode-background {
  background-color: #{$blue-100};
}
</style>
