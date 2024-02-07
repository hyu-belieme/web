<script setup lang="ts">
import { storeToRefs } from 'pinia';

import User from '@common/models/User';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserModeStorage from '@common/storages/user-mode-storage';

import DesktopHeader from '@^header/components/DesktopHeader.vue';
import MobileHeader from '@^header/components/MobileHeader.vue';

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUser } = storeToRefs(loggedInUserStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);
</script>

<template>
  <div :class="'w-100 desktop-frame ' + (userMode === 'STAFF' ? 'staff-mode-background' : '')">
    <DesktopHeader
      :key="`${loggedInUser?.id || ''} + ${curDeptId}`"
      :logged-in-user="loggedInUser ? new User(loggedInUser) : undefined"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
    ></DesktopHeader>
  </div>
  <div :class="'w-100 mobile-frame ' + (userMode === 'STAFF' ? 'staff-mode-background' : '')">
    <MobileHeader
      :key="`${loggedInUser?.id || ''} + ${curDeptId}`"
      :logged-in-user="loggedInUser ? new User(loggedInUser) : undefined"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
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
