<script setup lang="ts">
import { toRef } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import type UserMode from '@common/types/UserMode';

import HistoryList from '@^histories/components/HistoryList.vue';
import type { CategorizedHistorySet } from '@^histories/types/HistorySet';

const props = defineProps<{
  userMode: UserMode;
  selectedId: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isReturnedFetchingNextPage: boolean;
  isExpiredFetchingNextPage: boolean;
  categorizedHistories: CategorizedHistorySet[] | undefined;
  hasReturnedNextPage: boolean;
  hasExpiredNextPage: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateSelectedId', selectedId: string): void;
  (e: 'fetchReturnedNextPage'): void;
  (e: 'fetchExpiredNextPage'): void;
}>();

const selectedId = toRef(props, 'selectedId');

const categorizedHistories = toRef(props, 'categorizedHistories');
const isSuccess = toRef(props, 'isSuccess');
const isLoading = toRef(props, 'isLoading');
const isError = toRef(props, 'isError');
const isFetching = toRef(props, 'isFetching');
const isReturnedFetchingNextPage = toRef(props, 'isReturnedFetchingNextPage');
const isExpiredFetchingNextPage = toRef(props, 'isExpiredFetchingNextPage');
const hasExpiredNextPage = toRef(props, 'hasExpiredNextPage');
const hasReturnedNextPage = toRef(props, 'hasReturnedNextPage');
</script>

<template>
  <LoadingView
    v-if="isLoading || (isFetching && !(isExpiredFetchingNextPage || isReturnedFetchingNextPage))"
  ></LoadingView>
  <DataLoadFailView v-else-if="isError"></DataLoadFailView>
  <HistoryList
    v-else-if="isSuccess && categorizedHistories !== undefined"
    :user-mode="userMode"
    :selected-id="selectedId"
    :is-returned-fetching-next-page="isReturnedFetchingNextPage"
    :is-expired-fetching-next-page="isExpiredFetchingNextPage"
    :categorized-histories="categorizedHistories"
    :has-returned-next-page="hasReturnedNextPage"
    :has-expired-next-page="hasExpiredNextPage"
    @update-selected-id="(newSelectedId) => emit('updateSelectedId', newSelectedId)"
    @fetch-returned-next-page="() => emit('fetchReturnedNextPage')"
    @fetch-expired-next-page="() => emit('fetchExpiredNextPage')"
  ></HistoryList>
</template>

<style lang="scss" scoped></style>
