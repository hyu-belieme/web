<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, watchEffect } from "vue";
import { useQuery, useQueryClient } from "vue-query";

import { getAllStuffsInDept } from "@common/apis/newBeliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useModalStore } from "@common/stores/modalStore";
import { useDeptStore } from "@common/stores/newDeptStore";

import StuffListCell from "@^stuffs/components/StuffListCell/StuffListCell.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore.js";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

onBeforeMount(() => {
  stuffDetailViewModeStore.changeStuffDetailViewMode("SHOW");
  watchEffect(() => {
    if (data.value === undefined) return;

    const selectedStuff = data.value.get(selected.value);
    if (selectedStuff === undefined) return;

    stuffStore.updateSelectedId(selectedStuff.id);
    queryClient.invalidateQueries(stuffKeys.detail());
  });
  updateSelected(0);
});

const modalStore = useModalStore();

const stuffDetailViewModeStore = useStuffDetailViewModeStore();
const { stuffDetailViewMode } = storeToRefs(stuffDetailViewModeStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffStore();
const { selected } = storeToRefs(stuffStore);

const { data, isLoading, isSuccess } = useQuery(stuffKeys.list(), () =>
  getAllStuffsInDept(deptId.value)
);

const queryClient = useQueryClient();

const updateSelected = (toSelect: number) => {
  if (stuffDetailViewMode.value === "SHOW") {
    stuffStore.updateSelected(toSelect);
    return;
  }
  modalStore.addModal(_changingStuffAtEditionModeConfirmModal(toSelect));
};

const _changingStuffAtEditionModeConfirmModal = (toSelect: number) => {
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
    <template v-if="isSuccess && data != undefined">
      <StuffListCell
        v-for="(stuff, index) of data"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: index === selected }"
        @click="() => updateSelected(index)"
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
}
</style>
