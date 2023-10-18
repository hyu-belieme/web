<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, watch } from 'vue';

import BasicModal from '@common/components/BasicModal/BasicModal.vue';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import useModalStore from '@common/stores/modal-store';
import useUserModeStore from '@common/stores/user-mode-store';
import type UserMode from '@common/types/UserMode';

import StuffDetailContent from '@^stuffs/components/StuffDetailContent/StuffDetailContent.vue';
import ItemList from '@^stuffs/components/StuffDetailItemList/StuffDetailItemList.vue';
import { getStuffDetailQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';

const props = defineProps<{
  inheritStatus: 'Loading' | 'Success' | 'Error';
}>();

const modalStore = useModalStore();

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const { isSuccess, isLoading, isFetching } = getStuffDetailQuery();

const dataLoadStatus = computed(() => {
  if (props.inheritStatus === 'Loading') return 'Loading';
  if (props.inheritStatus === 'Error') return 'Error';

  if (isFetching.value || isLoading.value) return 'Loading';
  if (viewMode.value === 'ADD' || isSuccess.value) return 'Success';
  return 'Error';
});

function changingUserModeAtEditionModeConfirmModal(newUserMode: UserMode) {
  return {
    key: 'changeUserMode',
    component: BasicModal,
    props: {
      title: '이동하기',
      content: '지금 모드를 변경하면 변경사항은 저장되지 않습니다. 변경하시겠습니끼?',
      resolveLabel: '확인',
    },
    resolve: (_: any, key: string) => {
      viewModeStore.changeStuffDetailViewMode('SHOW');
      userModeStore.updateUserMode(newUserMode);
      modalStore.removeModal(key);
    },
    reject: (_: any, key: string) => {
      modalStore.removeModal(key);
    },
  };
}

onBeforeMount(() => {
  watch(userMode, (newVal, oldVal) => {
    if (newVal !== 'USER') return;
    if (viewMode.value === 'SHOW') return;
    userModeStore.updateUserMode(oldVal);
    modalStore.addModal(changingUserModeAtEditionModeConfirmModal(newVal));
  });
});
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
  width: 0;
  height: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  overflow: scroll;

  gap: map-get($map: $spacers, $key: 2);

  .stuff-info {
    flex-grow: 0;
  }

  .item-list {
    flex-grow: 1;
  }
}
</style>
