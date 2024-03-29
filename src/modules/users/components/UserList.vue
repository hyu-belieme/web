<template>
  <section class="user-list">
    <section class="w-100 flex-grow-0">
      <UserListHeader></UserListHeader>
    </section>
    <section class="w-100 h-100 flex-grow-1 d-flex flex-column overflow-scroll">
      <section v-if="isSuccess" class="w-100 h-100 d-flex flex-column">
        <UserListCell
          v-for="(cellInfo, idx) of sortedUserList()"
          :key="cellInfo.user.id + cellInfo.user.getPermission(curDeptId)"
          :idx="idx"
          :user="cellInfo.user"
          :checked="cellInfo.checked"
        ></UserListCell>
      </section>
      <LoadingView v-else-if="isLoading"></LoadingView>
      <DataLoadFailView v-else></DataLoadFailView>
    </section>
    <section class="w-100 p-2 d-flex flex-row gap-2 justify-content-center">
      <Popper
        disableClickAway
        arrow
        :show="openedUserTabGuidePopover"
        placement="top-end"
        :openDelay="500"
      >
        <BasicButton
          content="저장하기"
          size="sm"
          @click="() => modalStore.addModal(commitDiffModal)"
        ></BasicButton>
        <template #content>
          <div class="button-guide">변경사항을 반영하기 위해 저장하기 버튼을 누르세요.</div>
        </template>
      </Popper>
      <Popper
        disableClickAway
        arrow
        :show="openedUserTabGuidePopover"
        placement="top-start"
        :openDelay="500"
      >
        <BasicButton
          content="새로고침"
          color="light"
          size="sm"
          @click="() => modalStore.addModal(reloadModal)"
        ></BasicButton>
        <template #content>
          <div class="button-guide">변경사항을 원래대로 돌리기 위해 새로고침 버튼을 누르세요.</div>
        </template>
      </Popper>
    </section>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import Popper from 'vue3-popper';
import { useQuery, useQueryClient } from 'vue-query';

import { getAllUsersInDept, updateUserPermissions } from '@common/apis/belieme-apis';
import { userKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import useGuidePopoverStore from '@common/components/guide-popovers/stores/guide-popover-store';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type User from '@common/models/User';
import { hasHigherAuthorityPermission } from '@common/models/types/AuthorityPermission';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import ModalWithUserDiffList from '@^users/components/ModalWithUserDiffList.vue';
import UserListCell from '@^users/components/UserListCell.vue';
import UserListHeader from '@^users/components/UserListHeader.vue';
import useUserChecked from '@^users/stores/user-checked-store';
import useUserDiff from '@^users/stores/user-diff-store';
import useUserListFilter from '@^users/stores/user-list-filter-store';
import userDiffApplier from '@^users/utils/user-diff-applier';

const queryClient = useQueryClient();

const modalStore = useModalStore();

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);

const userCheckedStore = useUserChecked();
const { userWithCheckedList } = storeToRefs(userCheckedStore);

const userListFilterStore = useUserListFilter();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const guidePopoverStore = useGuidePopoverStore();
const { openedGuidePopovers } = storeToRefs(guidePopoverStore);

const guideFlagsStorage = useGuideFlagsStorage();

const openedUserTabGuidePopover = computed(() => {
  return openedGuidePopovers.value.includes('USER_TAB_MASTER');
});

if (guideFlagsStorage.getGuideFlag('USER_TAB_MASTER')?.value === false) {
  guidePopoverStore.openGuidePopover('USER_TAB_MASTER');
}

const {
  isLoading,
  isSuccess,
  data: baseUserList,
} = useQuery<User[]>(
  userKeys.list(curDeptId.value),
  () => getAllUsersInDept(userToken.value, curDeptId.value),
  {
    staleTime: Infinity,
  }
);

const diffAppliedUserList = computed(() =>
  userDiffApplier(baseUserList.value || [], userDiffList.value).filter(
    (e) => !hasHigherAuthorityPermission(e.getPermission(curDeptId.value), 'DEVELOPER')
  )
);

const commitDiffModal = {
  component: ModalWithUserDiffList,
  props: {
    title: '변경사항 적용하기',
    contentForMobile: '다음과 같은 변경사항을 적용하시겠습니까?',
    contentForDesktop: '변경사항을 적용하시겠습니까?',
    resolveLabel: '적용하기',
    rejectLabel: '뒤로가기',
    asyncResolve: () => {
      return updateUserPermissions(
        userToken.value,
        userDiffList.value.map((e) => ({
          userId: e.user.id,
          departmentId: curDeptId.value,
          permission: e.curState,
        }))
      );
    },
    onSuccess: () => {
      userDiffStore.clearUserDiffs();
      queryClient.refetchQueries(userKeys.list(curDeptId.value));
    },
    onError: (error: BaseError) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  },
};

const reloadModal = {
  component: ModalWithUserDiffList,
  props: {
    title: '사용자 리스트 새로고침',
    contentForMobile:
      '다음과 같은 변경사항은 모두 사라집니다. 그래도 사용자 리스트를 다시 불러올까요?',
    contentForDesktop:
      '저장하지 않은 변경사항은 모두 사라집니다. 그래도 사용자 리스트를 다시 불러올까요?',
    resolveLabel: '불러오기',
    rejectLabel: '뒤로가기',
    asyncResolve: () => Promise.resolve(),
    onSettled: () => {
      userDiffStore.clearUserDiffs();
      queryClient.refetchQueries(userKeys.list(curDeptId.value));
    },
  },
};

function applyUserListFilter() {
  const onlyUserList = userWithCheckedList.value.map((e) => e.user);
  const filteredUserList = userListFilterStore.applyFilters(onlyUserList);
  return filteredUserList.map((e) => ({
    user: e,
    checked: userCheckedStore.isChecked(e.id),
  }));
}

function sortedUserList() {
  return applyUserListFilter().sort((a, b) => {
    const aIsMaster = hasHigherAuthorityPermission(a.user.getPermission(curDeptId.value), 'MASTER');
    const bIsMaster = hasHigherAuthorityPermission(b.user.getPermission(curDeptId.value), 'MASTER');
    if (aIsMaster === bIsMaster) return a.user.compare(b.user);
    return aIsMaster ? -1 : 1;
  });
}

watch(diffAppliedUserList, () => {
  userCheckedStore.updateUserList(diffAppliedUserList.value);
});
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}

.button-guide {
  max-width: 8rem;
  height: auto;

  font-size: $font-size-sm;
}
</style>
