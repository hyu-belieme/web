<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, toRef } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { editStuff, postNewStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type StuffWithItems from '@common/models/StuffWithItems';
import type UserMode from '@common/types/UserMode';

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';
import StuffDetail from '@^stuffs/components/StuffDetail.vue';
import { getStuffDetailQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffEditionStore from '@^stuffs/stores/stuff-edition-store';
import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
  stuffDetailViewMode: StuffDetailViewMode;
  selectedId: string;
  isListSuccess: boolean;
  isListLoading: boolean;
  isListError: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateStuffDetailViewMode', viewMode: StuffDetailViewMode): void;
}>();

const stuffDetailViewMode = toRef(props, 'stuffDetailViewMode');

const isListSuccess = toRef(props, 'isListSuccess');
const isListLoading = toRef(props, 'isListLoading');
const isListError = toRef(props, 'isListError');

const queryClient = useQueryClient();

const { isSuccess, isError, isLoading, isFetching, data } = getStuffDetailQuery(
  props.userToken,
  props.selectedId
);

const modalStore = useModalStore();

const stuffEditionStore = useStuffEditionStore();
const { newName, newThumbnail, newDesc, newItemCount } = storeToRefs(stuffEditionStore);

const commitChangeMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    editStuff(props.userToken, props.selectedId, {
      name: newName.value,
      thumbnail: newThumbnail.value,
      desc: newDesc.value,
    }),
  {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
      queryClient.invalidateQueries(stuffKeys.detail(props.selectedId));
    },
    onSuccess: () => {
      emit('updateStuffDetailViewMode', 'SHOW');
    },
    onError: (error) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const commitAddNewStuffMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    postNewStuff(props.userToken, {
      departmentId: props.curDeptId,
      name: newName.value,
      thumbnail: newThumbnail.value,
      amount: newItemCount.value,
      desc: newDesc.value,
    }),
  {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
      queryClient.invalidateQueries(stuffKeys.detail(props.selectedId));
    },
    onSuccess: () => {
      emit('updateStuffDetailViewMode', 'SHOW');
    },
    onError: (error) => {
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const dataLoadStatus = computed(() => {
  if (isListLoading.value) return 'Loading';
  if (isListError.value) return 'Error';
  if (isListSuccess.value) {
    if (isLoading.value || isFetching.value) return 'Loading';
    if (isError.value) return 'Error';
    if (isSuccess.value) return 'Success';
    return 'Error';
  }
  return 'Error';
});
</script>

<template>
  <template v-if="dataLoadStatus === 'Success'">
    <StuffDetail
      v-if="stuffDetailViewMode === 'SHOW'"
      :user-mode="userMode"
      :stuff="data"
      @to-edit-mode="emit('updateStuffDetailViewMode', 'EDIT')"
      @to-register-mode="emit('updateStuffDetailViewMode', 'ADD')"
    ></StuffDetail>
    <EditableStuffDetail
      v-else-if="stuffDetailViewMode === 'EDIT'"
      :original-stuff="data"
      @commit-change="commitChangeMutation.mutate()"
      @close-edit-mode="emit('updateStuffDetailViewMode', 'SHOW')"
    ></EditableStuffDetail>
    <EditableStuffDetail
      v-else-if="stuffDetailViewMode === 'ADD'"
      :original-stuff="undefined"
      @commit-change="commitAddNewStuffMutation.mutate()"
      @close-edit-mode="emit('updateStuffDetailViewMode', 'SHOW')"
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
