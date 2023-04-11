<script setup lang="ts">
import stuffDummies from "@/assets/dummies/stuffs";
import StuffCell from "@/components/StuffCell.vue";
import Loading from "@/components/Loading.vue";
import DataLoadFail from "@/components/DataLoadFail.vue";
import { loading } from "@/models/Types";
import type Stuff from "@/models/stuff/Stuff";
import { useStuffStore } from "@/stores/stuffStore";
import { useModeStore } from "@/stores/modeStore";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import Modal from "@/components/Modal.vue";

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
    component: Modal,
    props: {
      title: "이동하기",
      content: "다른 물품을 선택하면 변경사항은 저장되지 않습니다. 이동하시겠습니끼?",
      resolveLabel: "확인"
    },
    resolve: () => {
      stuffStore.updateSelected(newVal);
      modeStore.changeMode("SHOW");
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
      <Loading></Loading>
    </template>
    <template v-else-if="stuffs === undefined">
      <DataLoadFail></DataLoadFail>
    </template>
    <template v-else>
      <StuffCell
        v-for="(stuff, index) in (stuffs as Stuff[])"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: index == selected }"
        @click="updateSelected(index)"
      ></StuffCell>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
