<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, watch } from "vue";

import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useModalStore } from "@common/stores/modalStore";
import { type UserMode, useUserStore } from "@common/stores/userStore";

import StuffDetailContent from "@^stuffs/components/StuffDetailContent/StuffDetailContent.vue";
import ItemList from "@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue";
import { getStuffDetailQuery } from "@^stuffs/components/utils/utils";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";

onBeforeMount(() => {
  watch(userMode, (newVal, oldVal) => {
    if (newVal !== "USER") return;
    if (viewMode.value === "SHOW") return;
    userStore.updateUserMode(oldVal);
    modalStore.addModal(_changingUserModeAtEditionModeConfirmModal(newVal));
  });
});

const props = defineProps<{
  inheritStatus: "Loading" | "Success" | "Error";
}>();

const modalStore = useModalStore();

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const { isSuccess, isLoading, isFetching } = getStuffDetailQuery();

const dataLoadStatus = computed(() => {
  if (props.inheritStatus === "Loading") return "Loading";
  if (props.inheritStatus === "Error") return "Error";

  if (isFetching.value || isLoading.value) return "Loading";
  if (viewMode.value === "ADD" || isSuccess.value) return "Success";
  return "Error";
});

const _changingUserModeAtEditionModeConfirmModal = (newUserMode: UserMode) => {
  return {
    key: "changeUserMode",
    component: BasicModal,
    props: {
      title: "이동하기",
      content: "지금 모드를 변경하면 변경사항은 저장되지 않습니다. 변경하시겠습니끼?",
      resolveLabel: "확인"
    },
    resolve: (_: any, key: string) => {
      viewModeStore.changeStuffDetailViewMode("SHOW");
      userStore.updateUserMode(newUserMode);
      modalStore.removeModal(key);
    },
    reject: (_: any, key: string) => {
      modalStore.removeModal(key);
    }
  };
};
</script>

<template>
  <section class="stuff-detail">
    <template v-if="dataLoadStatus === 'Success'">
      <StuffDetailContent></StuffDetailContent>
      <ItemList></ItemList>
    </template>
    <template v-else-if="dataLoadStatus === 'Loading'">
      <LoadingView></LoadingView>
    </template>
    <template v-else>
      <DataLoadFailView></DataLoadFailView>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;
  overflow: scroll;

  padding: map-get($map: $spacers, $key: 4);
  gap: map-get($map: $spacers, $key: 4);

  .stuff-info {
    flex-grow: 0;
  }

  .item-list {
    flex-grow: 1;
  }
}
</style>
