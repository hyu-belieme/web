<script setup lang="ts">
import type { List } from 'immutable';
import { toRef } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type Stuff from '@common/models/Stuff';
import type UserMode from '@common/types/UserMode';

import StuffList from '@^stuffs/components/StuffList.vue';
import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
  stuffDetailViewMode: StuffDetailViewMode;
  selectedId: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  stuffs: List<Stuff> | undefined;
}>();

const emit = defineEmits<{
  (e: 'updateStuffDetailViewMode', viewMode: StuffDetailViewMode): void;
  (e: 'updateSelectedId', newSelectedId: string): void;
}>();

const stuffDetailViewMode = toRef(props, 'stuffDetailViewMode');
const selectedId = toRef(props, 'selectedId');

const stuffs = toRef(props, 'stuffs');
const isSuccess = toRef(props, 'isSuccess');
const isLoading = toRef(props, 'isLoading');
const isError = toRef(props, 'isError');
const isFetching = toRef(props, 'isFetching');
</script>

<template>
  <LoadingView v-if="isLoading || isFetching"></LoadingView>
  <DataLoadFailView v-else-if="isError"></DataLoadFailView>
  <template v-else-if="isSuccess && stuffs !== undefined">
    <StuffList
      :user-token="userToken"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      :stuff-detail-view-mode="stuffDetailViewMode"
      :selected-id="selectedId"
      :stuffs="stuffs"
      @update-selected-id="(newSelectedId) => emit('updateSelectedId', newSelectedId)"
      @update-stuff-detail-view-mode="
        (newViewMode) => emit('updateStuffDetailViewMode', newViewMode)
      "
    ></StuffList>
  </template>
</template>

<style lang="scss" scoped></style>
