<script setup lang="ts">
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadErrorBox from "@common/components/DataLoadErrorBox/DataLoadErrorBox.vue";
import LoadingBox from "@common/components/LoadingBox/LoadingBox.vue";
import { useModalStore } from "@common/stores/modalStore";
import { useModeStore } from "@common/stores/modeStore";
import { loading } from "@common/types/Loading";
import type { Stuff } from "@common/types/Models";

import stuffDummies from "@modules/stuffs/assets/dummies/stuffDummies";
import StuffListCell from "@modules/stuffs/components/StuffListCell/StuffListCell.vue";
import { useStuffStore } from "@modules/stuffs/stores/stuffStore";

import { storeToRefs } from "pinia";

const modeStore = useModeStore();
const { detailStuffMode } = storeToRefs(modeStore);

const modalStore = useModalStore();

const stuffStore = useStuffStore();
const { stuffs, selected } = storeToRefs(stuffStore);

updateSelected(0);
updateStuffs();

// ====== functions ======

function updateSelected(newVal: number) {
  if (newVal == selected.value) return;
  if (detailStuffMode.value == "SHOW") {
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
      modeStore.changeDetailStuffMode("SHOW");
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
      <LoadingBox></LoadingBox>
    </template>
    <template v-else-if="stuffs === undefined">
      <DataLoadErrorBox></DataLoadErrorBox>
    </template>
    <template v-else>
      <StuffListCell
        v-for="(stuff, index) in (stuffs as Stuff[])"
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
