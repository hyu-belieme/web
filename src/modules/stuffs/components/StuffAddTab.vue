<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';
import { useRouter } from 'vue-router';

import { postNewStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import StuffWithItems from '@common/models/StuffWithItems';

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
}>();

const router = useRouter();

const queryClient = useQueryClient();

const modalStore = useModalStore();

const editStuffComponent = ref<InstanceType<typeof EditableStuffDetail> | null>(null);

const editionAppliedStuff = computed(
  () => editStuffComponent.value?.getNewStuff() ?? StuffWithItems.NIL
);

const { isLoading, mutate } = useMutation<StuffWithItems, BaseError>(
  () =>
    postNewStuff(props.userToken, {
      departmentId: props.curDeptId,
      name: editionAppliedStuff.value.name,
      thumbnail: editionAppliedStuff.value.thumbnail,
      desc: editionAppliedStuff.value.desc,
      amount: editionAppliedStuff.value.items.size,
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

function makeCommitInputConfirmModal() {
  return {
    component: ConfirmModal,
    props: {
      title: '물품 추가하기',
      content: '새로운 물품을 추가하시겠습니까?',
      resolveLabel: '추가하기',
      rejectLabel: '뒤로가기',
    },
    resolve: () => {
      mutate();
      modalStore.removeModal();
    },
    reject: () => {
      modalStore.removeModal();
    },
  };
}
</script>

<template>
  <EditableStuffDetail
    ref="editStuffComponent"
    :stuff="StuffWithItems.NIL"
    :is-loading="isLoading"
    @commit-change="modalStore.addModal(makeCommitInputConfirmModal())"
    @close-edit-mode="router.back()"
  ></EditableStuffDetail>
</template>

<style lang="scss" scoped></style>
