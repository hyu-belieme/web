<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';
import { useRouter } from 'vue-router';

import { addNewItem, editStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import StuffWithItems from '@common/models/StuffWithItems';
import type UserMode from '@common/types/UserMode';

import EditableStuffDetail from '@^stuffs/components/EditableStuffDetail.vue';
import StuffDetail from '@^stuffs/components/StuffDetail.vue';
import { getStuffDetailQuery } from '@^stuffs/components/utils/stuff-query-utils';
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

const router = useRouter();
const queryClient = useQueryClient();

const {
  isSuccess: isSuccessOnGetDetail,
  isError: isErrorOnGetDetail,
  isLoading: isLoadingOnDetail,
  isFetching: isFetchingOnDetail,
  data,
} = getStuffDetailQuery(props.userToken, props.selectedId);

const modalStore = useModalStore();

const editStuffComponent = ref<InstanceType<typeof EditableStuffDetail> | null>(null);

const editionAppliedStuff = computed(
  () => editStuffComponent.value?.getNewStuff() ?? StuffWithItems.NIL
);

const newItemCount = computed(() => editStuffComponent.value?.getNewItemCount() ?? 0);

const { isLoading: isLoadingOnAddingItem, mutate: addItemMutate } = useMutation<
  StuffWithItems,
  BaseError
>(() => addNewItem(props.userToken, props.selectedId, newItemCount.value), {
  onSettled: () => {
    queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
    queryClient.invalidateQueries(stuffKeys.detail(props.selectedId));
    emit('updateStuffDetailViewMode', 'SHOW');
  },
  onError: (error) => {
    modalStore.addModal(buildAlertModal('errorAlert', error.message));
  },
});

const { isLoading: isLoadingOnUpdatingStuff, mutate: updateStuffMutate } = useMutation<
  StuffWithItems,
  BaseError
>(
  () =>
    editStuff(props.userToken, props.selectedId, {
      name: editionAppliedStuff.value.name,
      thumbnail: editionAppliedStuff.value.thumbnail,
      desc: editionAppliedStuff.value.desc,
    }),
  {
    onSuccess: () => {
      if (newItemCount.value <= 0) {
        queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
        queryClient.invalidateQueries(stuffKeys.detail(props.selectedId));
        emit('updateStuffDetailViewMode', 'SHOW');
        return;
      }
      addItemMutate();
    },
    onError: (error) => {
      queryClient.invalidateQueries(stuffKeys.list(props.curDeptId));
      queryClient.invalidateQueries(stuffKeys.detail(props.selectedId));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const isLoadingOnShowMode = computed(
  () => isListLoading.value || isLoadingOnDetail.value || isFetchingOnDetail.value
);

const isErrorOnShowMode = computed(
  () => isListError.value || (isListSuccess.value && isErrorOnGetDetail.value)
);

const isSuccessOnShowMode = computed(() => isListSuccess.value && isSuccessOnGetDetail.value);

const isLoadingOnEditMode = computed(
  () => isLoadingOnAddingItem.value || isLoadingOnUpdatingStuff.value
);

function commitChangeStuff() {
  updateStuffMutate();
}
</script>

<template>
  <StuffDetail
    v-if="stuffDetailViewMode === 'SHOW'"
    :is-loading="isLoadingOnShowMode"
    :is-error="isErrorOnShowMode"
    :is-success="isSuccessOnShowMode"
    :user-mode="userMode"
    :stuff="data ?? StuffWithItems.NIL"
    @to-edit-mode="emit('updateStuffDetailViewMode', 'EDIT')"
    @to-register-mode="router.push('/stuffs/add')"
  ></StuffDetail>
  <EditableStuffDetail
    v-else-if="stuffDetailViewMode === 'EDIT'"
    ref="editStuffComponent"
    :stuff="data ?? StuffWithItems.NIL"
    :is-loading="isLoadingOnEditMode"
    @commit-change="commitChangeStuff()"
    @close-edit-mode="emit('updateStuffDetailViewMode', 'SHOW')"
  ></EditableStuffDetail>
</template>

<style lang="scss" scoped></style>
