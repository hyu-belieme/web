<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { editStuff, postNewStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type StuffWithItems from '@common/models/StuffWithItems';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';
import StuffDetail from '@^stuffs/components/StuffDetail.vue';
import {
  getStuffDetailQuery,
  getStuffListQuery,
  reloadStuffDataUsingCacheAndResponse,
} from '@^stuffs/components/utils/stuff-query-utils';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';
import useStuffEditionStore from '@^stuffs/stores/stuff-edition-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const queryClient = useQueryClient();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const {
  isLoading: isListLoading,
  isSuccess: isListSuccess,
  isStale: isListDataStale,
} = getStuffListQuery();
const { isLoading, isSuccess, data } = getStuffDetailQuery();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const stuffEditionStore = useStuffEditionStore();
const { newName, newThumbnail, newDesc, newItemCount } = storeToRefs(stuffEditionStore);

const commitChangeMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    editStuff(userToken.value, selectedId.value, {
      name: newName.value,
      thumbnail: newThumbnail.value,
    }),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
      viewModeStore.changeStuffDetailViewMode('SHOW');
    },
    onError: (error) => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const commitAddNewStuffMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    postNewStuff(userToken.value, {
      departmentId: curDeptId.value,
      name: newName.value,
      thumbnail: newThumbnail.value,
      amount: newItemCount.value,
    }),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
      viewModeStore.changeStuffDetailViewMode('SHOW');
    },
    onError: (error) => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const dataLoadStatus = computed(() => {
  if (isListLoading.value) return 'Loading';
  if (isListSuccess.value) {
    if (isLoading.value) return 'Loading';
    if (isSuccess.value) return 'Success';
    return 'Error';
  }
  return 'Error';
});
</script>

<template>
  <template v-if="dataLoadStatus === 'Success'">
    <StuffDetail
      v-if="viewMode === 'SHOW'"
      :stuff="data"
      @to-edit-mode="viewModeStore.changeStuffDetailViewMode('EDIT')"
      @to-register-mode="viewModeStore.changeStuffDetailViewMode('ADD')"
    ></StuffDetail>
    <EditableStuffDetail
      v-else-if="viewMode === 'EDIT'"
      :original-stuff="data"
      @commit-change="commitChangeMutation.mutate()"
      @close-edit-mode="viewModeStore.changeStuffDetailViewMode('SHOW')"
    ></EditableStuffDetail>
    <EditableStuffDetail
      v-else-if="viewMode === 'ADD'"
      :original-stuff="undefined"
      @commit-change="commitAddNewStuffMutation.mutate()"
      @close-edit-mode="viewModeStore.changeStuffDetailViewMode('SHOW')"
    ></EditableStuffDetail>
  </template>
  <template v-else-if="dataLoadStatus === 'Loading'">
    <LoadingView></LoadingView>
  </template>
  <template v-else>
    <DataLoadFailView></DataLoadFailView>
  </template>
</template>

<style lang="scss" scoped></style>
