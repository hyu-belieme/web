<script setup lang="ts">
import { ref } from 'vue';

import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';

const props = withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    size?: string;
    resolveLabel?: string;
    rejectLabel?: string;
    asyncResolve?: () => Promise<void>;
    onSettled?: () => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    hasCloseButton?: boolean;
  }>(),
  {
    size: '',
    resolveLabel: '',
    rejectLabel: '',
    hasCloseButton: false,
  }
);

const modalStore = useModalStore();
const isLoading = ref<boolean>(false);

async function resolve() {
  if (props.asyncResolve !== undefined) {
    isLoading.value = true;
    modalStore.pauseCloseLogic();

    props
      .asyncResolve()
      .then(() => {
        isLoading.value = false;
        modalStore.restartCloseLogic();
        modalStore.removeModal();

        if (props.onSettled !== undefined) {
          props.onSettled();
        }

        if (props.onSuccess !== undefined) {
          props.onSuccess();
        }
      })
      .catch((error) => {
        isLoading.value = false;
        modalStore.restartCloseLogic();
        modalStore.removeModal();

        if (props.onSettled !== undefined) {
          props.onSettled();
        }

        if (props.onError !== undefined) {
          props.onError(error);
        }
      });
  }
}
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey" v-bind:size="size">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">물품 대여 방법</span>
    </template>
    <template v-slot:body>
      <LoadingView v-if="isLoading"></LoadingView>
      <section v-else class="d-flex flex-column gap-3 p-1">
        <section class="desc">
          <span>1. 물품목록 페이지에서 필요한 물품의 대여신청을 한다.</span>
          <span
            >2. 대여 신청 후 15분 내에 대여 장소로 이동한다. 15분이 지나면 대여 신청이 자동으로
            취소된다.</span
          >
          <span>3. 대여 장소에서 관리자를 통해 물품을 대여한다.</span>
          <span>4. 사용 후 대여장소에서 관리자를 통해 반납한다.</span>
        </section>
        <section class="rental-space-image">
          <img class="w-100" src="@common/assets/images/map_example.png" />
        </section>
      </section>
    </template>
    <template v-if="rejectLabel !== '' || resolveLabel !== ''" v-slot:footer>
      <div v-if="!isLoading" class="d-flex flex-gap-2">
        <BasicButton
          v-if="resolveLabel !== ''"
          color="primary"
          :content="resolveLabel"
          @click="() => resolve()"
        >
        </BasicButton>
        <BasicButton
          v-if="rejectLabel !== ''"
          color="light"
          :content="rejectLabel"
          @click="() => modalStore.removeModal()"
        >
          {{ rejectLabel }}
        </BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}

.desc {
  width: 100%;

  font-size: $font-size-sm;
  font-weight: $font-weight-normal;

  display: flex;
  flex-direction: column;

  gap: map-get($spacers, 1);
}

.rental-space-image {
  width: 100%;
}
</style>
