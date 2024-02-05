<script setup lang="ts">
import type { List } from 'immutable';
import { NIL as NIL_UUID } from 'uuid';
import { toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type Stuff from '@common/models/Stuff';

import StuffListCell from '@^stuffs/components/StuffListCell.vue';
import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const props = defineProps<{
  userToken: string;
  stuffDetailViewMode: StuffDetailViewMode;
  selectedId: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  stuffs: List<Stuff> | undefined;
}>();

const emit = defineEmits<{
  (e: 'updateStuffDetailViewMode', viewMode: StuffDetailViewMode): void;
  (e: 'updateSelectedId', newSelectedId: string): void;
}>();

const stuffDetailViewMode = toRef(props, 'stuffDetailViewMode');
const selectedId = toRef(props, 'selectedId');

const stuffs = toRef(props, 'stuffs');
const isSuccess = toRef(props, 'isSuccess');
const isLoading = toRef(props, 'isLoading');
const isError = toRef(props, 'isError');
const isFetching = toRef(props, 'isFetching');

const router = useRouter();

const modalStore = useModalStore();

function moveToNewStuffCell(newSelectedId: string) {
  router.push(`/stuffs?stuffId=${newSelectedId}`);
  emit('updateSelectedId', newSelectedId);
}

function changingStuffAtEditionModeConfirmModal(newSelectedId: string) {
  return {
    component: ConfirmModal,
    props: {
      title: '이동하기',
      content: '다른 물품을 선택하면 변경사항은 저장되지 않습니다. 이동하시겠습니끼?',
      resolveLabel: '이동하기',
      rejectLabel: '뒤로가기',
    },
    resolve: () => {
      moveToNewStuffCell(newSelectedId);
      emit('updateStuffDetailViewMode', 'SHOW');
      modalStore.removeModal();
    },
    reject: () => {
      modalStore.removeModal();
    },
  };
}

function updateSelectedId(newSelectedId: string) {
  if (newSelectedId === selectedId.value || stuffDetailViewMode.value === 'SHOW') {
    moveToNewStuffCell(newSelectedId);
    return;
  }
  modalStore.addModal(changingStuffAtEditionModeConfirmModal(newSelectedId));
}

function convertIdToFirstIdIfNotExist(currentId: string) {
  if (stuffs.value === undefined || stuffs.value.isEmpty()) return NIL_UUID;
  const selected = stuffs.value.find((value) => value.id === currentId);
  if (selected === undefined) return stuffs.value.get(0)?.id || NIL_UUID;
  return selected.id;
}

watch(
  stuffs,
  () => {
    if (!isSuccess.value) return;
    const newId = convertIdToFirstIdIfNotExist(selectedId.value);
    emit('updateSelectedId', newId);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <section class="stuff-list">
    <LoadingView v-if="isLoading || isFetching"></LoadingView>
    <DataLoadFailView v-else-if="isError"></DataLoadFailView>
    <template v-else-if="isSuccess && stuffs !== undefined">
      <StuffListCell
        v-for="stuff of stuffs"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: stuff.id === selectedId }"
        @click="() => updateSelectedId(stuff.id)"
      ></StuffListCell>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();

  overflow: scroll;
}
</style>
