<script setup lang="ts">
import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";

import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useModalStore } from "@common/stores/modalStore";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@^stuffs/assets/dummies/stuffDummies";
import StuffListCell from "@^stuffs/components/StuffListCell/StuffListCell.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore.js";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

onBeforeMount(() => {
  stuffDetailViewModeStore.changeStuffDetailViewMode("SHOW");
  updateSelected(0);
  updateStuffs();
});

const stuffDetailViewModeStore = useStuffDetailViewModeStore();
const { stuffDetailViewMode } = storeToRefs(stuffDetailViewModeStore);

const stuffStore = useStuffStore();
const { stuffs, selected } = storeToRefs(stuffStore);

const modalStore = useModalStore();

const updateStuffs = () => {
  stuffStore.updateStuffs({
    load: () => {
      // return undefined;
      // return loading;
      return stuffDummies;
    }
  });
};

const updateSelected = (toSelect: number) => {
  if (toSelect === selected.value) return;
  if (stuffDetailViewMode.value === "SHOW") {
    stuffStore.updateSelected(toSelect);
    return;
  }

  modalStore.addModal(changingStuffAtEditionModeConfirmModal(toSelect));
};

const changingStuffAtEditionModeConfirmModal = (toSelect: number) => {
  return {
    key: "changeStuff",
    component: BasicModal,
    props: {
      title: "이동하기",
      content: "다른 물품을 선택하면 변경사항은 저장되지 않습니다. 이동하시겠습니끼?",
      resolveLabel: "확인"
    },
    resolve: (_: any, key: string) => {
      stuffStore.updateSelected(toSelect);
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
    <template v-if="stuffs === loading">
      <LoadingView></LoadingView>
    </template>
    <template v-else-if="stuffs === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <StuffListCell
        v-for="(stuff, index) of (stuffs as List<Stuff>)"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: index === selected }"
        @click="updateSelected(index)"
      ></StuffListCell>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
