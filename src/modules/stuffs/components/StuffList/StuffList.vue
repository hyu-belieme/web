<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";

import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useModalStore } from "@common/stores/modalStore";

import StuffListCell from "@^stuffs/components/StuffListCell/StuffListCell.vue";
import { getStuffListQuery } from "@^stuffs/components/utils/utils";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore.js";
import { useStuffSelectedStore } from "@^stuffs/stores/stuffSelectedStore";

onBeforeMount(() => {
  stuffDetailViewModeStore.changeStuffDetailViewMode("SHOW");
});

const modalStore = useModalStore();

const stuffDetailViewModeStore = useStuffDetailViewModeStore();
const { stuffDetailViewMode } = storeToRefs(stuffDetailViewModeStore);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const { data, isLoading, isSuccess } = getStuffListQuery();

const updateSelectedId = (newSelectedId: string) => {
  if (stuffDetailViewMode.value === "SHOW") {
    stuffStore.updateSelectedId(newSelectedId);
    return;
  }
  modalStore.addModal(_changingStuffAtEditionModeConfirmModal(newSelectedId));
};

const _changingStuffAtEditionModeConfirmModal = (newSelectedId: string) => {
  return {
    key: "changeStuff",
    component: BasicModal,
    props: {
      title: "이동하기",
      content: "다른 물품을 선택하면 변경사항은 저장되지 않습니다. 이동하시겠습니끼?",
      resolveLabel: "확인"
    },
    resolve: (_: any, key: string) => {
      stuffStore.updateSelectedId(newSelectedId);
      stuffDetailViewModeStore.changeStuffDetailViewMode("SHOW");
      modalStore.removeModal(key);
    },
    reject: (_: any, key: string) => {
      modalStore.removeModal(key);
    }
  };
};
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
  display: flex;
  flex-direction: column;

  overflow: scroll;
}
</style>
