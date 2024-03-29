<script setup lang="ts">
import { ref } from 'vue';

import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';

import UserDiffListContent from '@^users/components/UserDiffListContent.vue';

const props = withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    title?: string;
    contentForDesktop?: string;
    contentForMobile?: string;
    resolveLabel?: string;
    rejectLabel?: string;
    size?: string;
    asyncResolve?: () => Promise<void>;
    onSettled?: () => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
  }>(),
  {
    title: '',
    content: '',
    size: '',
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
      <span class="modal-title fs-lg fw-semibold">{{ title }}</span>
    </template>
    <template v-slot:body>
      <LoadingView v-if="isLoading"></LoadingView>
      <template v-else>
        <section class="on-mobile">
          <section class="d-flex flex-column gap-1">
            <section class="user-diff-list-frame">
              <UserDiffListContent></UserDiffListContent>
            </section>
            <p class="no-margin-p">{{ contentForMobile }}</p>
          </section>
        </section>
        <section class="on-desktop">
          <p class="no-margin-p fw-light">{{ contentForDesktop }}</p>
        </section>
      </template>
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

.user-diff-list-frame {
  border: $border-width solid $border-color;
  @include border-radius();

  height: 20rem;
  overflow: scroll;

  background-color: $gray-50;
}

@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .on-desktop {
    display: none;
  }

  .on-mobile {
    display: block;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .on-desktop {
    display: block;
  }

  .on-mobile {
    display: none;
  }
}
</style>
