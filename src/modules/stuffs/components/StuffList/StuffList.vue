<script setup lang="ts">
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useModalStore } from "@common/stores/modalStore";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@^stuffs/assets/dummies/stuffDummies";
import StuffListCell from "@^stuffs/components/StuffListCell/StuffListCell.vue";
import { useDetailStuffViewModeStore } from "@^stuffs/stores/DetailStuffViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

import { storeToRefs } from "pinia";
import type { List } from "immutable";

const detailStuffViewModeStore = useDetailStuffViewModeStore();
const { detailStuffViewMode } = storeToRefs(detailStuffViewModeStore);

const modalStore = useModalStore();

const stuffStore = useStuffStore();
const { stuffs, selected } = storeToRefs(stuffStore);

updateSelected(0);
updateStuffs();

// ====== functions ======

function updateSelected(newVal: number) {
  if (newVal == selected.value) return;
  if (detailStuffViewMode.value == "SHOW") {
    stuffStore.updateSelected(newVal);
    return;
  }

  modalStore.addModal({
    key: "changeStuff",
    component: BasicModal,
    props: {
      title: "이동하기",
      content: "다른 물품을 선택하면 변경사항은 저장되지 않습니다. 이동하시겠습니끼?",
      resolveLabel: "확인"
    },
    resolve: () => {
      stuffStore.updateSelected(newVal);
      detailStuffViewModeStore.changeDetailStuffViewMode("SHOW");
    },
    reject: () => {}
  });
}

function updateStuffs() {
  stuffStore.updateStuffs({
    load: () => {
      // return undefined;
      // return loading;
      return stuffDummies;
    }
  });
}
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
        v-for="(stuff, index) in (stuffs as List<Stuff>)"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: index == selected }"
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
