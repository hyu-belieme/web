<script setup lang="ts">
import { toRef } from 'vue';
import { useQueryClient } from 'vue-query';

import { approveItem, cancelItem, returnItem } from '@common/apis/belieme-apis';
import { historyKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import NeedLoadingConfirmModal from '@common/components/modals/NeedLoadingConfirmModal/NeedLoadingConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import type UserMode from '@common/types/UserMode';

const props = defineProps<{
  userToken: string;
  userMode: UserMode;
  data: History;
}>();

const data = toRef(props, 'data');

const modalStore = useModalStore();

const queryClient = useQueryClient();

const rentalApproveModal = {
  component: NeedLoadingConfirmModal,
  props: {
    title: '대여 승인하기',
    content: `신청자의 학생증을 확인 후에 물품을 빌려주었나요? 승인을 하면 기록이 저장되며 해당 기록은 사라지지 않습니다.`,
    resolveLabel: '승인하기',
    rejectLabel: '뒤로가기',
    asyncResolve: () => approveItem(props.userToken, data.value.item.id),
    onSettled: () => {
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail(props.data.id));
    },
    onError: (error: BaseError) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  },
};

const requestCancelModal = {
  component: NeedLoadingConfirmModal,
  props: {
    title: '신청 취소하기',
    content: `신청을 취소할 경우 해당 물품을 다른 사람이 대여할 수 있게 됩니다. 취소하시겠습니까?`,
    resolveLabel: '취소하기',
    rejectLabel: '뒤로가기',
    asyncResolve: () => cancelItem(props.userToken, data.value.item.id),
    onSettled: () => {
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail(props.data.id));
    },
    onError: (error: BaseError) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  },
};

const returnApproveModal = {
  component: NeedLoadingConfirmModal,
  props: {
    title: '반납 승인하기',
    content:
      '대여해 준 물품을 받으셨나요? 반납 승인 시 해당 물품은 다시 대여 가능해 지고 이를 되돌릴 수 없습니다.',
    resolveLabel: '승인하기',
    rejectLabel: '뒤로가기',
    asyncResolve: () => returnItem(props.userToken, data.value!.item.id),
    onSettled: () => {
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail(props.data.id));
    },
    onError: (error: BaseError) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  },
};
</script>

<template>
  <section v-if="data !== undefined" class="buttons">
    <template v-if="data.status === 'REQUESTED'">
      <BasicButton
        v-if="userMode === 'STAFF'"
        class="flex-grow-1"
        :color="'primary'"
        :content="'대여승인'"
        :onClick="() => modalStore.addModal(rentalApproveModal)"
      ></BasicButton>
      <BasicButton
        class="flex-grow-1"
        :color="'light'"
        :content="'요청취소'"
        :onClick="() => modalStore.addModal(requestCancelModal)"
      ></BasicButton>
    </template>
    <template v-else-if="data.status === 'USING' || data.status === 'DELAYED'">
      <BasicButton
        v-if="userMode === 'STAFF'"
        class="flex-grow-1"
        :color="'primary'"
        :content="'반납확인'"
        :onClick="() => modalStore.addModal(returnApproveModal)"
      ></BasicButton>
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
