<script setup lang="ts">
import { toRef } from 'vue';

import type UserMode from '@common/types/UserMode';

import HistoryDetailTab from '@^histories/components/HistoryDetailTab.vue';
import HistoryListTab from '@^histories/components/HistoryListTab.vue';
import type { CategorizedHistorySet } from '@^histories/types/HistorySet';

const props = defineProps<{
  userToken: string;
  userMode: UserMode;
  selectedId: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isReturnedFetchingNextPage: boolean;
  isExpiredFetchingNextPage: boolean;
  categorizedHistories: CategorizedHistorySet[] | undefined;
  hasExpiredNextPage: boolean;
  hasReturnedNextPage: boolean;
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
  <section class="tabs-wrapper">
    <section class="list-section">
      <HistoryListTab
        :user-mode="userMode"
        :selected-id="selectedId"
        :is-success="isSuccess"
        :is-loading="isLoading"
        :is-error="isError"
        :is-fetching="isFetching"
        :is-returned-fetching-next-page="isReturnedFetchingNextPage"
        :is-expired-fetching-next-page="isExpiredFetchingNextPage"
        :categorized-histories="categorizedHistories"
        :has-expired-next-page="hasExpiredNextPage"
        :has-returned-next-page="hasReturnedNextPage"
        @update-selected-id="(newSelectedId) => emit('updateSelectedId', newSelectedId)"
        @fetch-returned-next-page="() => emit('fetchReturnedNextPage')"
        @fetch-expired-next-page="() => emit('fetchExpiredNextPage')"
      ></HistoryListTab>
    </section>
    <section class="detail-section">
      <HistoryDetailTab
        :key="selectedId"
        :user-mode="userMode"
        :user-token="userToken"
        :selected-id="selectedId"
        :is-list-success="isSuccess"
        :is-list-loading="isLoading"
        :is-list-error="isError"
      ></HistoryDetailTab>
    </section>
  </section>
</template>

<style lang="scss" scoped>
$list-height: calc(100vh - $header-height-desktop);

.tabs-wrapper {
  width: 100%;
  height: fit-content;
  min-height: $list-height;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .list-section {
    width: 24rem;
    height: $list-height;

    position: sticky;
    top: 0;
  }

  .detail-section {
    width: 0;

    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);

    flex-grow: 1;
  }
}
</style>
