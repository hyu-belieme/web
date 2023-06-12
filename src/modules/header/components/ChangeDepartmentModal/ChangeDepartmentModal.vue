<script setup lang="ts">
import type { List } from 'immutable';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';

import { getAccessibleDeptList } from '@common/apis/belieme-apis';
import { deptKeys } from '@common/apis/query-keys';
import BasicModal from '@common/components/BasicModal/BasicModal.vue';
import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type Department from '@common/models/Department';
import { deptStorage, userTokenStorage } from '@common/webstorages/storages';

import DepartmentCell from '@^header/components/DepartementCell/DepartmentCell.vue';

const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits(['close', 'reject', 'resolve']);

const router = useRouter();

const userToken = userTokenStorage.get();
const curDeptId = deptStorage.get()?.id;

const { isSuccess, isLoading, data } = useQuery<List<Department>>(
  deptKeys.accessible(userToken || ''),
  () => getAccessibleDeptList(userToken || '')
);

function changeDept(dept: Department) {
  deptStorage.set(dept);
  emit('close');
  router.go(0);
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
          v-bind="{ dept: dept, selected: dept.id === curDeptId }"
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
