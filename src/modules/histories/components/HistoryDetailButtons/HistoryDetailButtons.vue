<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMutation, useQueryClient } from 'vue-query';

import { approveItem, cancelItem, returnItem } from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';
import useUserModeStore from '@common/stores/user-mode-store';

import {
  getHistoryDetailQuery,
  getHistoryListQuery,
  reloadHistoryDataUsingCacheAndResponse,
} from '@^histories/components/utils/history-query-utils';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUserId } = storeToRefs(loggedInUserStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const { isStale: isListDataStale } = getHistoryListQuery();

const { isSuccess, data } = getHistoryDetailQuery();

const queryClient = useQueryClient();

function changeItemRequestMutation(mutationFn: () => Promise<History>) {
  return useMutation<History, BaseError>(mutationFn, {
    onSuccess: (response) => {
      reloadHistoryDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
    },
    onError: (error) => {
      console.error(error);
      queryClient.invalidateQueries(historyKeys.listByDept(curDeptId.value));
      queryClient.invalidateQueries(
        historyKeys.listByDeptAndRequester(curDeptId.value, loggedInUserId.value)
      );
      queryClient.invalidateQueries({ queryKey: historyKeys.detail() });
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  });
}

const rentalApproveMutation = changeItemRequestMutation(() =>
  approveItem(userToken.value, data.value!.item.id)
);

const cancelRequestMutation = changeItemRequestMutation(() =>
  cancelItem(userToken.value, data.value!.item.id)
);

const returnApproveMutation = changeItemRequestMutation(() =>
  returnItem(userToken.value, data.value!.item.id)
);

const rentalApproveModal = {
  component: ConfirmModal,
  props: {
    title: '대여 승인하기',
    content:
      '신청자의 학생증을 확인 후에 물품을 빌려주었나요? 승인을 하면 기록이 저장되며 해당 기록은 사라지지 않습니다.',
    resolveLabel: '승인하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    rentalApproveMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

const requestCancelModal = {
  component: ConfirmModal,
  props: {
    title: '신청 취소하기',
    content: '신청을 취소할 경우 해당 물품을 다른 사람이 대여할 수 있게 됩니다. 취소하시겠습니까?',
    resolveLabel: '취소하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    cancelRequestMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

const returnApproveModal = {
  component: ConfirmModal,
  props: {
    title: '반납 승인하기',
    content:
      '대여해 준 물품을 받으셨나요? 반납 승인 시 해당 물품은 다시 대여 가능해 지고 이를 되돌릴 수 없습니다.',
    resolveLabel: '승인하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    returnApproveMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};
</script>

<template>
  <section v-if="isSuccess && data !== undefined" class="buttons">
    <template v-if="data.status === 'REQUESTED'">
      <button
        v-if="userMode === 'STAFF' || userMode === 'MASTER'"
        class="btn btn-primary btn-sm"
        @click="modalStore.addModal(rentalApproveModal)"
      >
        대여 승인
      </button>
      <button class="btn btn-danger btn-sm" @click="modalStore.addModal(requestCancelModal)">
        신청 취소
      </button>
    </template>
    <template v-else-if="data.status === 'USING' || data.status === 'DELAYED'">
      <button
        v-if="userMode === 'STAFF' || userMode === 'MASTER'"
        class="btn btn-primary btn-sm"
        @click="modalStore.addModal(returnApproveModal)"
      >
        반납 확인
      </button>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: map-get($map: $spacers, $key: 2);
}
</style>
