<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Popper from 'vue3-popper';
import { useRoute } from 'vue-router';

import useGuidePopoverStore from '@common/components/guide-popovers/stores/guide-popover-store';
import ChevronIcon from '@common/components/icons/ChevronIcon/ChevronIcon.vue';
import User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';
import type UserMode from '@common/types/UserMode';

import MobileNavigationBar from '@^header/components/MobileNavigationBar.vue';
import UserDropdown from '@^header/components/UserDropdown.vue';

const props = defineProps<{
  loggedInUser: User;
  curDeptId: string;
  userMode: UserMode;
}>();

const route = useRoute();
const isLoggedIn = computed(() => {
  return !(route.path === '/' || route.path.startsWith('/login'));
});

const guidePopoverStore = useGuidePopoverStore();
const { openedGuidePopovers } = storeToRefs(guidePopoverStore);

const guideFlagsStorage = useGuideFlagsStorage();

const openedUserHeaderGuidePopover = computed(() => {
  return openedGuidePopovers.value.includes('HEADER_USER');
});

const openedStaffHeaderGuidePopover = computed(() => {
  return openedGuidePopovers.value.includes('HEADER_STAFF');
});

if (
  !props.loggedInUser.equals(User.NIL) &&
  guideFlagsStorage.getGuideFlag('HEADER_STAFF')?.value === false &&
  hasHigherAuthorityPermission(props.loggedInUser?.getPermission(props.curDeptId), 'STAFF')
) {
  guidePopoverStore.openGuidePopover('HEADER_STAFF');
}

if (
  !props.loggedInUser.equals(User.NIL) &&
  guideFlagsStorage.getGuideFlag('HEADER_USER')?.value === false
) {
  guidePopoverStore.openGuidePopover('HEADER_USER');
}
</script>

<template>
  <section class="w-100 px-3 py-2 d-flex flex-column gap-2">
    <section class="w-100 d-flex flex-row align-items-center justify-content-between">
      <ChevronIcon direction="left" class="invisible"></ChevronIcon>
      <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
      <Popper
        disableClickAway
        arrow
        :show="openedUserHeaderGuidePopover || openedStaffHeaderGuidePopover"
        placement="left-start"
        :openDelay="500"
      >
        <UserDropdown :class="!isLoggedIn ? 'invisible' : ''"></UserDropdown>
        <template #content>
          <div class="user-dropdown-desc">
            다른 학과로 이동, 사용 가이드 활성화,
            <span v-if="openedStaffHeaderGuidePopover" class="emphasize"> 관리자 모드 전환, </span
            >로그아웃 등을 할 수 있다.
          </div>
        </template>
      </Popper>
    </section>
    <MobileNavigationBar></MobileNavigationBar>
  </section>
</template>

<style scoped lang="scss">
.logo {
  height: $header-font-size * $header-line-height * 1.25;
}

.user-dropdown-desc {
  max-width: 14rem;
  height: auto;

  font-size: $font-size-sm;
}

.emphasize {
  font-weight: $font-weight-semibold;
  color: $primary;
}
</style>
