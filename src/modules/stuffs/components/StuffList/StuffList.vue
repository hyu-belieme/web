<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { onBeforeMount, watch } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';

import StuffListCell from '@^stuffs/components/StuffListCell/StuffListCell.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const modalStore = useModalStore();

const stuffDetailViewModeStore = useStuffDetailViewModeStore();
const { stuffDetailViewMode } = storeToRefs(stuffDetailViewModeStore);

const stuffSelectedStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffSelectedStore);

const { data, isLoading, isSuccess } = getStuffListQuery();

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
      stuffSelectedStore.updateSelectedId(newSelectedId);
      stuffDetailViewModeStore.changeStuffDetailViewMode('SHOW');
      modalStore.removeModal();
    },
    reject: () => {
      modalStore.removeModal();
    },
  };
}

function updateSelectedId(newSelectedId: string) {
  if (stuffDetailViewMode.value === 'SHOW') {
    stuffSelectedStore.updateSelectedId(newSelectedId);
    return;
  }
  modalStore.addModal(changingStuffAtEditionModeConfirmModal(newSelectedId));
}

function convertIdToFirstIdIfNotExist() {
  if (data.value === undefined || data.value.isEmpty()) return NIL_UUID;

  const selected = data.value.find((value) => value.id === selectedId.value);
  if (selected === undefined) return data.value.get(0)?.id || NIL_UUID;
  return selected.id;
}

watch(
  data,
  () => {
    const convertedSelectedId = convertIdToFirstIdIfNotExist();
    if (convertedSelectedId !== selectedId.value) {
      stuffSelectedStore.updateSelectedId(convertedSelectedId);
    }
  },
  { immediate: true }
);

onBeforeMount(() => {
  stuffDetailViewModeStore.changeStuffDetailViewMode('SHOW');
});
</script>

<template>
  <section class="stuff-list">
    <template v-if="isSuccess && data !== undefined">
      <StuffListCell
        v-for="stuff of data"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: stuff.id === selectedId }"
        @click="() => updateSelectedId(stuff.id)"
      ></StuffListCell>
    </template>
    <template v-else-if="isLoading">
      <LoadingView></LoadingView>
    </template>
    <template v-else>
      <DataLoadFailView></DataLoadFailView>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  height: 100%;
  width: 24rem;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();

  overflow: scroll;
}
</style>
