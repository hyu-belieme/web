<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { getCurrentInstance } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { rentItem, reportLostItem, returnItem } from '@common/apis/belieme-apis';
import { historyKeys, stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
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
  },
  resolve: (_: any) => {
    rentalRequestMutation.mutate();
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
  },
  resolve: (_: any) => {
    lostRequestMutation.mutate();
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
    rejectLabel: '취소하기',
  },
  resolve: (_: any) => {
    foundApproveMutation.mutate();
    modalStore.removeModal();
  },
  reject: (_: any) => {
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
      <span class="position-absolute start-50 top-50 translate-middle fs-xlg fw-bold">
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
      <template v-if="viewMode === 'SHOW'">
        <BasicButton
          v-if="item.status === 'USABLE'"
          @click="() => modalStore.addModal(rentalRequestModal)"
          v-bind:content="'대여 신청'"
          v-bind:color="'primary'"
          v-bind:size="'sm'"
        >
        </BasicButton>
        <BasicButton
          v-else
          @click="modalStore.addModal(rentalRequestModal)"
          v-bind:content="'대여 신청'"
          v-bind:color="'primary'"
          v-bind:size="'sm'"
          disabled
        >
        </BasicButton>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <BasicButton
            v-if="item.status !== 'LOST'"
            @click="modalStore.addModal(lostRequestModal)"
            v-bind:content="'분실 등록'"
            v-bind:color="'primary'"
            v-bind:size="'sm'"
          >
          </BasicButton>
          <BasicButton
            v-else
            @click="modalStore.addModal(foundApproveModal)"
            v-bind:content="'반환 확인'"
            v-bind:color="'primary'"
            v-bind:size="'sm'"
          >
          </BasicButton>
        </template>
      </template>
      <template v-else>
        <button
          v-if="viewMode === 'ADD' || item.id === NIL_UUID"
          type="button"
          class="btn btn-danger btn-sm"
          @click="emit('popItem')"
        >
          <i class="bi bi-dash-lg"></i>
        </button>
        <button v-else type="button" class="btn btn-danger btn-sm" disabled>
          <i class="bi bi-dash-lg"></i>
        </button>
      </template>
    </section>
  </section>
</template>

<style lang="scss" scoped>
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
