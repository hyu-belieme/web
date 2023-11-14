<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { getCurrentInstance } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { rentItem, reportLostItem, returnItem } from '@common/apis/belieme-apis';
import { historyKeys, stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import MinusButton from '@common/components/buttons/MinusButton/MinusButton.vue';
import ThreeDotsButton from '@common/components/buttons/ThreeDotsButton/ThreeDotsButton.vue';
import FitContentDropdown from '@common/components/dropdowns/FitContentDropdown/FitContentDropdown.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import type ItemInfoOnly from '@common/models/ItemInfoOnly';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';
import useUserModeStore from '@common/stores/user-mode-store';

import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const emit = defineEmits(['popItem']);

const props = defineProps<{
  item: ItemInfoOnly;
}>();

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const queryClient = useQueryClient();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

function changeItemRequestMutation(mutationFn: () => Promise<History>) {
  return useMutation<History, BaseError>(mutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: historyKeys.list() });
      queryClient.setQueryData(historyKeys.detail(response.id), response);
    },
    onError: (error) => {
      console.error(error);
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
  component: ConfirmModal,
  props: {
    title: '대여 신청하기',
    content:
      '신청을 한 후에 대여장소에서 관리자를 통해 대여 승인을 받고 대여 할 수 있습니다. 단, 해당 신청은 15분 후에 자동으로 만료됩니다.',
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

function textByStatus(item: ItemInfoOnly) {
  if (item.status === 'USABLE') return '대여 가능';
  if (item.status === 'REQUESTED') return '예약 됨';
  if (item.status === 'USING') return '대여 중';
  if (item.status === 'LOST') return '사용 불가';
  return 'ERROR';
}

function relativeTimeString(time: number) {
  return dayjs.unix(time).fromNow();
}

function timestampByStatus(item: ItemInfoOnly) {
  if (item.status === 'REQUESTED') {
    return relativeTimeString(item.lastHistory?.requestedAt!);
  }
  if (item.status === 'USING') {
    return relativeTimeString(item.lastHistory?.approvedAt!);
  }
  if (item.status === 'LOST') {
    return relativeTimeString(item.lastHistory?.lostAt!);
  }
  return 'ERROR';
}
</script>

<template>
  <section class="cell">
    <section class="numbering">
      <span class="position-absolute start-50 top-50 translate-middle fs-xl fw-bold">
        {{ item.num }}
      </span>
    </section>
    <section :class="['content', item.status !== 'USABLE' ? 'red' : '']">
      <section class="info">
        <span>{{ textByStatus(item) }}</span>
        <span v-if="item.status !== 'USABLE'" class="fw-normal fs-sm"
          >({{ timestampByStatus(item) }})</span
        >
      </section>
      <template v-if="viewMode === 'SHOW' && userMode === 'USER'">
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
          @click="modalStore.addModal(rentalRequestModal)"
          v-bind:content="'대여신청'"
          v-bind:color="'primary'"
          v-bind:size="'sm'"
          disabled
        >
        </BasicButton>
      </template>
      <template v-else-if="(viewMode === 'SHOW' && userMode === 'STAFF') || userMode === 'MASTER'">
        <FitContentDropdown v-bind:align="'right'" v-bind:type="'hover'">
          <template v-slot:trigger>
            <section class="p-1">
              <ThreeDotsButton></ThreeDotsButton>
            </section>
          </template>
          <template v-slot:menu="{ closeDropdown }">
            <li v-if="item.status === 'USABLE'">
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="
                  () => {
                    modalStore.addModal(rentalRequestModal);
                    closeDropdown();
                  }
                "
              >
                대여신청
              </a>
            </li>
            <li v-if="item.status !== 'LOST'">
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="
                  () => {
                    modalStore.addModal(lostRequestModal);
                    closeDropdown();
                  }
                "
              >
                분실등록
              </a>
            </li>
            <li v-else>
              <a
                class="dropdown-item py-1 px-2 lh-sm"
                @click="
                  () => {
                    modalStore.addModal(foundApproveModal);
                    closeDropdown();
                  }
                "
              >
                반환확인
              </a>
            </li>
          </template>
        </FitContentDropdown>
      </template>
      <template v-else>
        <MinusButton
          v-if="viewMode === 'ADD' || viewMode === 'INITIAL_ADD' || item.id === NIL_UUID"
          size="xs"
          color="danger"
          :onClick="() => emit('popItem')"
        >
        </MinusButton>
        <MinusButton v-else size="xs" color="danger" :disabled="true"></MinusButton>
      </template>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import '@common/components/dropdowns/styles/main';
.cell {
  position: relative;

  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);

  padding-top: map-get($spacers, 1);
  padding-bottom: map-get($spacers, 1);

  background-color: $white;
  border: $border-width solid $border-color;
  @include border-radius();

  display: flex;
  flex-direction: row;
  align-items: center;

  .numbering {
    position: relative;
    width: 2rem;
    height: 2rem;
  }

  .content {
    width: 100%;
    height: 100%;

    padding-left: map-get($spacers, 1);
    padding-right: map-get($spacers, 1);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: map-get($spacers, 2);

    &.red {
      color: $danger;
      font-weight: $font-weight-semibold;
    }

    .info {
      flex-grow: 1;

      padding-top: map-get($spacers, 2);
      padding-bottom: map-get($spacers, 2);

      display: flex;
      flex-direction: row;
      align-items: center;
      gap: map-get($spacers, 1);
    }
  }
}
</style>
