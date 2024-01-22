<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMutation, useQueryClient } from 'vue-query';
import { useRouter } from 'vue-router';

import { postNewStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type StuffWithItems from '@common/models/StuffWithItems';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';
import useStuffEditionStore from '@^stuffs/stores/stuff-edition-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const router = useRouter();

const queryClient = useQueryClient();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const stuffEditionStore = useStuffEditionStore();
const { newName, newThumbnail, newDesc, newItemCount } = storeToRefs(stuffEditionStore);

const commitAddNewStuffMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    postNewStuff(userToken.value, {
      departmentId: curDeptId.value,
      name: newName.value,
      thumbnail: newThumbnail.value,
      amount: newItemCount.value,
      desc: newDesc.value,
    }),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      router.back();
    },
    onError: (error) => {
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);
</script>

<template>
  <EditableStuffDetail
    :original-stuff="undefined"
    @commit-change="commitAddNewStuffMutation.mutate()"
    @close-edit-mode="router.back()"
  ></EditableStuffDetail>
</template>

<style lang="scss" scoped></style>
