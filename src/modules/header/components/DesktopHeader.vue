<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Popper from 'vue3-popper';
import { useRoute } from 'vue-router';

import useGuidePopoverStore from '@common/components/guide-popovers/stores/guide-popover-store';
import type User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';
import type UserMode from '@common/types/UserMode';

import DesktopNavigationBar from '@^header/components/DesktopNavigationBar.vue';
import UserDropdown from '@^header/components/UserDropdown.vue';

const props = defineProps<{
  loggedInUser: User | undefined;
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
  props.loggedInUser !== undefined &&
  guideFlagsStorage.getGuideFlag('HEADER_STAFF')?.value === false &&
  hasHigherAuthorityPermission(props.loggedInUser?.getPermission(props.curDeptId), 'STAFF')
) {
  guidePopoverStore.openGuidePopover('HEADER_STAFF');
}

if (
  props.loggedInUser !== undefined &&
  guideFlagsStorage.getGuideFlag('HEADER_USER')?.value === false
) {
  guidePopoverStore.openGuidePopover('HEADER_USER');
}
</script>

<template>
  <section class="d-flex flex-row align-items-center w-100 ps-5 pe-5 pt-2 pb-2 border-bottom">
    <section class="flex-grow-0">
      <img class="logo" src="@common/assets/images/belieme_logo_en.png" />
    </section>
    <DesktopNavigationBar></DesktopNavigationBar>
    <Popper
      disableClickAway
      arrow
      :show="openedUserHeaderGuidePopover || openedStaffHeaderGuidePopover"
      placement="bottom-start"
      :openDelay="100"
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
</template>

<style scoped lang="scss">
.logo {
  height: $header-font-size * $header-line-height * 1.25;
}

.user-dropdown-desc {
  width: 14rem;
  height: auto;

  font-size: $font-size-sm;
}

.emphasize {
  font-weight: $font-weight-semibold;
  color: $primary;
}
</style>
