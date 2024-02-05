<script setup lang="ts">
import { useMutation, useQueryClient } from 'vue-query';

import { rentStuff } from '@common/apis/belieme-apis';
import { historyKeys, stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import type Stuff from '@common/models/Stuff';
import type UserMode from '@common/types/UserMode';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
  stuff: Stuff;
  selected: boolean;
}>();

const queryClient = useQueryClient();

const modalStore = useModalStore();

function changeItemRequestMutation(mutationFn: () => Promise<History>) {
  return useMutation<History, BaseError>(mutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
      queryClient.invalidateQueries(stuffKeys.detail(props.stuff.id));
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail());
    },
    onError: (error) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  });
}

const rentalRequestMutation = changeItemRequestMutation(() =>
  rentStuff(props.userToken, props.stuff.id)
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
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="thumbnail">{{ stuff.thumbnail }}</span>
      <section class="name-and-remaining">
        <span class="name">{{ stuff.name }}</span>
        <span class="remaining">{{
          stuff.count === 0 ? '남지 않음' : stuff.count + '개 남음'
        }}</span>
        <section v-if="userMode === 'USER'" class="rent-buttons">
          <BasicButton
            v-if="stuff.count > 0"
            v-bind:content="'대여신청'"
            v-bind:color="'primary'"
            v-bind:size="'sm'"
            @click.stop="() => modalStore.addModal(rentalRequestModal)"
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
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-up('tablet-landscape') {
  .selected {
    background-color: $gray-100;
  }

  .content {
    .name-and-remaining {
      border-bottom: calc($border-width * 0.5) solid transparent;
      .name {
        width: 0;
        flex-grow: 1;
      }

      .remaining {
        flex-grow: 0;
      }

      .rent-buttons {
        display: none;
      }
    }
  }
}

@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .content {
    .name-and-remaining {
      .name {
        flex-grow: 0;
      }

      .remaining {
        flex-grow: 1;
      }

      .rent-buttons {
        flex-grow: 0;
      }
    }
  }
}

.cell {
  $padding-size: map-get($spacers, 2);
  position: relative;

  padding-left: $padding-size;
  padding-right: $padding-size;

  &:hover {
    background-color: $gray-100;

    .content {
      .name-and-remaining {
        border-bottom: calc($border-width * 0.5) solid transparent;
      }
    }
  }

  .content {
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .thumbnail {
      width: 3rem;
      height: 3rem;
      font-size: $h2-font-size;
      text-align: center;
    }

    .name-and-remaining {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      align-items: center;
      gap: map-get($spacers, 2);
      margin-left: map-get($spacers, 1);
      margin-right: map-get($spacers, 1);

      border-bottom: calc($border-width * 0.5) solid $border-color;

      .name {
        font-size: $font-size-base;
        font-weight: $font-weight-semibold;
      }

      .remaining {
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        color: $gray-700;
      }
    }
  }
}
</style>
