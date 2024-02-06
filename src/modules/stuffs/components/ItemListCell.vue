<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMutation, useQueryClient } from 'vue-query';

import { rentItem, reportLostItem, returnItem } from '@common/apis/belieme-apis';
import { historyKeys, stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import ThreeDotsButton from '@common/components/buttons/ThreeDotsButton/ThreeDotsButton.vue';
import FitContentDropdown from '@common/components/dropdowns/FitContentDropdown/FitContentDropdown.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type Modal from '@common/components/modals/types/Modal';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import type Item from '@common/models/Item';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';
import type UserMode from '@common/types/UserMode';

import StuffRequestConfirmModal from '@^stuffs/components/StuffRequestConfirmModal.vue';
import ItemListCellFrame from '@^stuffs/components/stuff-detail-frames/ItemListCellFrame.vue';

const props = defineProps<{
  userMode: UserMode;
  item: Item;
}>();

const queryClient = useQueryClient();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

function changeItemRequestMutation(mutationFn: () => Promise<History>) {
  return useMutation<History, BaseError>(mutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(props.item.stuff.id));
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail());
    },
    onError: (error) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  });
}

const rentalRequestMutation = changeItemRequestMutation(() =>
  rentItem(userToken.value, props.item.id)
);

const lostRequestMutation = changeItemRequestMutation(() =>
  reportLostItem(userToken.value, props.item.id)
);

const foundApproveMutation = changeItemRequestMutation(() =>
  returnItem(userToken.value, props.item.id)
);

const rentalRequestModal = {
  component: StuffRequestConfirmModal,
  props: {
    resolveLabel: '신청하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    rentalRequestMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

const lostRequestModal = {
  component: ConfirmModal,
  props: {
    title: '분실 등록하기',
    content:
      '해당 물품을 분실하셨나요? 분실 등록 시 해당 물품은 사용 불가능 한 상태가 됩니다. 물품을 되찾게 된다면 반환 처리를 할 수 있지만 분실 기록은 남게 됩니다.',
    resolveLabel: '등록하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    lostRequestMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

const foundApproveModal = {
  component: ConfirmModal,
  props: {
    title: '반환 확인하기',
    content:
      '분실한 물품을 찾으셨나요? 반환 확인 시 해당 묾품이 다시 사용가능해 집니다. 다시 물품을 분실된 상태로 만들 수 있지만 그렇게 할 시 새로운 기록은 남게 됩니다.',
    resolveLabel: '확인하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    foundApproveMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

function addModalAndCloseDropdown(modal: Modal, closeDropdown: () => void) {
  modalStore.addModal(modal);
  closeDropdown();
}
</script>

<template>
  <ItemListCellFrame :item="item">
    <template v-slot:buttons>
      <template v-if="userMode === 'USER'">
        <BasicButton
          v-if="item.status === 'USABLE'"
          @click="() => modalStore.addModal(rentalRequestModal)"
          v-bind:content="'대여신청'"
          v-bind:color="'primary'"
          v-bind:size="'sm'"
        >
        </BasicButton>
        <BasicButton
          v-else
          v-bind:content="'대여신청'"
          v-bind:color="'primary'"
          v-bind:size="'sm'"
          disabled
        >
        </BasicButton>
      </template>
      <template v-else-if="userMode === 'STAFF'">
        <FitContentDropdown v-bind:align="'right'" v-bind:type="'hover'">
          <template v-slot:trigger>
            <section class="py-1 d-flex align-items-center">
              <ThreeDotsButton :size="'sm'"></ThreeDotsButton>
            </section>
          </template>
          <template v-slot:menu="{ closeDropdown }">
            <li v-if="item.status === 'USABLE'">
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="() => addModalAndCloseDropdown(rentalRequestModal, closeDropdown)"
              >
                대여신청
              </a>
            </li>
            <li v-if="item.status !== 'LOST'">
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="() => addModalAndCloseDropdown(lostRequestModal, closeDropdown)"
              >
                분실등록
              </a>
            </li>
            <li v-else>
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="() => addModalAndCloseDropdown(foundApproveModal, closeDropdown)"
              >
                반환확인
              </a>
            </li>
          </template>
        </FitContentDropdown>
      </template>
    </template>
  </ItemListCellFrame>
</template>

<style lang="scss" scoped>
@import '@common/components/dropdowns/styles/main';
</style>
