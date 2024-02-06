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

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';
import useStuffEditionStore from '@^stuffs/stores/stuff-edition-store';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
}>();

const router = useRouter();

const queryClient = useQueryClient();

const modalStore = useModalStore();

const stuffEditionStore = useStuffEditionStore();
const { newName, newThumbnail, newDesc, newItemCount } = storeToRefs(stuffEditionStore);

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
    onSuccess: () => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
      router.back();
    },
    onError: (error) => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
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
