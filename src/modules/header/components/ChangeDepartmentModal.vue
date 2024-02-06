<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useQuery } from 'vue-query';

import { getAccessibleDeptList } from '@common/apis/belieme-apis';
import { deptKeys } from '@common/apis/query-keys';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
import type Department from '@common/models/Department';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

defineProps<{
  modalKey: string;
  index: number;
}>();

const modalStore = useModalStore();

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();

const selectedDept = ref<Department | null>(null);

const { isSuccess, isLoading, isError, data } = useQuery<List<Department>>(
  deptKeys.accessible(userToken.value),
  () => getAccessibleDeptList(userToken.value)
);

const deptMap = computed(() => {
  const tmpMap = new Map<string, { value: Department; label: string }>();
  data.value?.forEach((e) => {
    tmpMap.set(e.id, {
      value: e,
      label: e.name,
    });
  });
  return tmpMap;
});

function changeDept(newDept: Department | null) {
  if (newDept) {
    curDeptStorage.setItem(newDept);
  }
  modalStore.removeModal();
}
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">학과 변경하기</span>
    </template>
    <template v-slot:body>
      <section v-if="isSuccess && data" class="dept-list">
        <BasicSelector
          class="w-100"
          :disabled="isLoading || isError"
          :options="deptMap"
          hint="학과를 선택해주세요."
          @on-change="(keys) => (selectedDept = deptMap.get(keys.newKey)?.value ?? null)"
        ></BasicSelector>
      </section>
      <LoadingView v-else-if="isLoading"></LoadingView>
      <DataLoadFailView v-else></DataLoadFailView>
    </template>
    <template v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton
          color="primary"
          content="변경하기"
          :disabled="!selectedDept"
          @click="() => changeDept(selectedDept)"
        >
        </BasicButton>
        <BasicButton color="light" content="뒤로가기" @click="() => modalStore.removeModal()">
        </BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.dept-list {
  display: flex;
  flex-direction: column;
}
</style>
