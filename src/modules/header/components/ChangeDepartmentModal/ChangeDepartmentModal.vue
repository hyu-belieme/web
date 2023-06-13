<script setup lang="ts">
import type { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { useQuery } from 'vue-query';

import { getAccessibleDeptList } from '@common/apis/belieme-apis';
import { deptKeys } from '@common/apis/query-keys';
import BasicModal from '@common/components/BasicModal/BasicModal.vue';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type Department from '@common/models/Department';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import DepartmentCell from '@^header/components/DepartementCell/DepartmentCell.vue';

const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits(['close', 'reject', 'resolve']);

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDept } = storeToRefs(curDeptStorage);

const { isSuccess, isLoading, data } = useQuery<List<Department>>(
  deptKeys.accessible(userToken.value),
  () => getAccessibleDeptList(userToken.value)
);

function changeDept(newDept: Department) {
  curDeptStorage.setItem(newDept);
  emit('close');
}
</script>

<template>
  <BasicModal
    v-bind="props"
    @resolve="$emit('resolve')"
    @reject="$emit('reject')"
    @close="$emit('close')"
  >
    <template v-slot:body>
      <section v-if="isSuccess && data" class="dept-list">
        <DepartmentCell
          v-for="dept in data"
          :key="dept.id"
          v-bind="{ dept: dept, selected: dept.id === curDept.id }"
          @click="changeDept(dept)"
        ></DepartmentCell>
      </section>
      <LoadingView v-else-if="isLoading"></LoadingView>
      <DataLoadFailView v-else></DataLoadFailView>
    </template>
    <template v-slot:footer> </template>
  </BasicModal>
</template>

<style scoped></style>
