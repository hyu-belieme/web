<script setup lang="ts">
import type { List } from 'immutable';
import { NIL as NIL_UUID } from 'uuid';
import { toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

import PlusButton from '@common/components/buttons/PlusButton/PlusButton.vue';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type Stuff from '@common/models/Stuff';
import type UserMode from '@common/types/UserMode';

import StuffListCell from '@^stuffs/components/StuffListCell.vue';
import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
  stuffDetailViewMode: StuffDetailViewMode;
  selectedId: string;
  stuffs: List<Stuff> | undefined;
}>();

const emit = defineEmits<{
  (e: 'updateStuffDetailViewMode', viewMode: StuffDetailViewMode): void;
  (e: 'updateSelectedId', newSelectedId: string): void;
}>();

const stuffDetailViewMode = toRef(props, 'stuffDetailViewMode');
const selectedId = toRef(props, 'selectedId');

const stuffs = toRef(props, 'stuffs');

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
    const newId = convertIdToFirstIdIfNotExist(selectedId.value);
    emit('updateSelectedId', newId);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <section class="stuff-list-frame">
    <section class="stuff-list">
      <StuffListCell
        v-for="(stuff, idx) of stuffs"
        :key="stuff.name"
        :user-token="userToken"
        :cur-dept-id="curDeptId"
        :user-mode="userMode"
        :stuff="stuff"
        :idx="idx"
        :selected="stuff.id === selectedId"
        @click="() => updateSelectedId(stuff.id)"
      ></StuffListCell>
    </section>
    <PlusButton
      v-if="userMode === 'STAFF'"
      class="floating-button"
      color="dark"
      size="xl"
      @click="router.push('/stuffs/add')"
    ></PlusButton>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list-frame {
  position: relative;

  width: 100%;
  height: 100%;
}

.stuff-list {
  width: 100%;
  height: 100%;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();

  overflow: scroll;
}

@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .floating-button {
    position: absolute;
    bottom: map-get($spacers, 3);
    right: map-get($spacers, 3);
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .floating-button {
    display: none;
  }
}
</style>
