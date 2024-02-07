<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Popper from 'vue3-popper';
import { useMutation, useQueryClient } from 'vue-query';

import { rentStuff } from '@common/apis/belieme-apis';
import { historyKeys, stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import useGuidePopoverStore from '@common/components/guide-popovers/stores/guide-popover-store';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type History from '@common/models/History';
import type Stuff from '@common/models/Stuff';
import useGuideFlagsStorage from '@common/storages/guide-flags-storage';
import type UserMode from '@common/types/UserMode';

import StuffRequestConfirmModal from '@^stuffs/components/StuffRequestConfirmModal.vue';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
  stuff: Stuff;
  idx: number;
  selected: boolean;
}>();

const queryClient = useQueryClient();

const modalStore = useModalStore();

const guidePopoverStore = useGuidePopoverStore();
const { openedGuidePopovers } = storeToRefs(guidePopoverStore);

const guideFlagsStorage = useGuideFlagsStorage();

const openedStuffCellGuidePopover = computed(() => {
  return props.idx === 0 && openedGuidePopovers.value.includes('STUFF_LIST_COMMON');
});

const openedRentStuffButtonGuidePopover = computed(() => {
  return (
    props.userMode === 'USER' &&
    props.idx === 3 &&
    openedGuidePopovers.value.includes('STUFF_LIST_USER')
  );
});

if (guideFlagsStorage.getGuideFlag('STUFF_LIST_COMMON')?.value === false) {
  guidePopoverStore.openGuidePopover('STUFF_LIST_COMMON');
}

if (
  props.userMode === 'USER' &&
  guideFlagsStorage.getGuideFlag('STUFF_LIST_USER')?.value === false
) {
  guidePopoverStore.openGuidePopover('STUFF_LIST_USER');
}

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
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="thumbnail">{{ stuff.thumbnail }}</span>
      <section class="name-and-remaining">
        <Popper
          disableClickAway
          arrow
          :show="openedStuffCellGuidePopover"
          placement="bottom-start"
          :openDelay="500"
        >
          <span class="name">{{ stuff.name }}</span>
          <template #content>
            <div class="stuff-cell-guide">물품을 선택하여 개별 페이지로 이동하세요.</div>
          </template>
        </Popper>
        <span class="remaining">{{
          stuff.count === 0 ? '남지 않음' : stuff.count + '개 남음'
        }}</span>
        <section v-if="userMode === 'USER'" class="rent-buttons">
          <Popper
            disableClickAway
            arrow
            :show="openedRentStuffButtonGuidePopover"
            placement="bottom-start"
            :openDelay="500"
          >
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
            <template #content>
              <div class="stuff-rent-button-guide">
                간편하게 물품을 대여하고 싶다면 이 버튼을 눌러주세요.
              </div>
            </template>
          </Popper>
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

.stuff-cell-guide {
  max-width: 15rem;
  height: auto;

  font-size: $font-size-sm;
}

.stuff-rent-button-guide {
  max-width: 10rem;
  height: auto;

  font-size: $font-size-sm;
}
</style>
