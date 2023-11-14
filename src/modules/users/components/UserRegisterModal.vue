<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onUnmounted, ref } from 'vue';
import { useQuery, useQueryClient } from 'vue-query';

import { getAllUsersInDept, getUserByIndex } from '@common/apis/belieme-apis';
import { userKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingViewVue from '@common/components/LoadingView/LoadingView.vue';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import CloseButton from '@common/components/buttons/CloseButton/CloseButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';
import type User from '@common/models/User';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import UserDiff from '@^users/models/UserDiff';
import useUserDiff from '@^users/stores/user-diff-store';
import userDiffApplier from '@^users/utils/user-diff-applier';

const props = withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    univId: string;
    studentId: string;
    size?: string;
    hasCloseButton?: boolean;
  }>(),
  {
    size: '',
    hasCloseButton: false,
  }
);

const curDeptStorage = useCurDeptStorage();
const { curDept, curDeptId } = storeToRefs(curDeptStorage);

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const queryClient = useQueryClient();

const isNotFoundError = ref(false);

const { isSuccess, isLoading, data } = useQuery<User>(
  userKeys.detailByIndex(props.univId, props.studentId),
  () =>
    new Promise<User>((resolve, reject) => {
      getUserByIndex(userToken.value, props.univId, props.studentId)
        .then((e) => resolve(e))
        .catch((e) => {
          if (e.name === 'NOT_FOUND') {
            isNotFoundError.value = true;
          }
          reject(e);
        });
    }),
  {
    staleTime: Infinity,
    retry: false,
  }
);

const userDiffStore = useUserDiff();
const { userDiffList } = storeToRefs(userDiffStore);

const { data: baseUserList } = useQuery<User[]>(
  userKeys.list(curDeptId.value),
  () => getAllUsersInDept(userToken.value, curDeptId.value),
  {
    staleTime: Infinity,
  }
);

const diffAppliedUserList = computed(() =>
  userDiffApplier(baseUserList.value || [], userDiffList.value)
);

function registerUser() {
  if (data.value !== undefined) {
    userDiffStore.putUserDiff(
      new UserDiff({
        user: data.value,
        dept: curDept.value,
        prevState: 'NIL',
        curState: 'USER',
      })
    );
  }
}

onUnmounted(() => {
  queryClient.invalidateQueries(userKeys.detailByIndex(props.univId, props.studentId));
});
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey" v-bind:size="size">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">유저 등록하기</span>
      <CloseButton v-if="hasCloseButton" @click="$emit('close')" aria-label="Close"></CloseButton>
    </template>
    <template v-slot:body>
      <p
        v-if="
          isSuccess &&
          data !== undefined &&
          diffAppliedUserList.findIndex((e) => e.id === data?.id) === -1
        "
        class="no-margin-p fw-light"
      >
        {{ data.university.name }}의 {{ data.name }}({{ data.studentId }})를 학과 물품을 대여할 수
        있는 유저로 등록하시겠습니까?
      </p>
      <p v-else-if="isSuccess && data !== undefined" class="no-margin-p fw-light">
        {{ data.university.name }}의 {{ data.name }}({{ data.studentId }})는 이미 등록되어 있습니다.
      </p>
      <LoadingViewVue v-else-if="isLoading"> </LoadingViewVue>
      <p v-else-if="isNotFoundError" class="no-margin-p fw-light">
        입력한 정보에 해당하는 유저가 없습니다. 다시 입력한 후에 진행해 주세요.
      </p>
      <DataLoadFailView v-else> </DataLoadFailView>
    </template>
    <template v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton
          v-if="
            isSuccess &&
            data !== undefined &&
            diffAppliedUserList.findIndex((e) => e.id === data?.id) === -1
          "
          color="primary"
          content="등록하기"
          @click="
            () => {
              registerUser();
              $emit('resolve');
            }
          "
        >
        </BasicButton>
        <BasicButton color="light" content="뒤로가기" @click="$emit('reject')"></BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}
</style>
