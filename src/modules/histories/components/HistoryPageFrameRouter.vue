<script setup lang="ts">
import { NIL as NIL_UUID } from 'uuid';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { History } from '@common/models/History';
import type UserMode from '@common/types/UserMode';

import CommonHistoryPageOnDesktop from '@^histories/components/CommonHistoryPageOnDesktop.vue';
import CommonHistoryPageOnMobile from '@^histories/components/CommonHistoryPageOnMobile.vue';
import HistoryPageOnEmpty from '@^histories/components/HistoryPageOnEmpty.vue';
import {
  getHistoryListInfiniteQuery,
  getHistoryListQuery,
} from '@^histories/components/utils/history-query-utils';
import type { CategorizedHistorySet } from '@^histories/types/HistorySet';

const route = useRoute();

const props = defineProps<{
  userToken: string;
  loggedInUserId: string;
  curDeptId: string;
  userMode: UserMode;
}>();

const {
  data: requestedData,
  isSuccess: isRequestedSuccess,
  isLoading: isRequestedLoading,
  isError: isRequestedError,
  isFetching: isRequestedFetching,
} = getHistoryListQuery(
  props.userToken,
  props.curDeptId,
  props.userMode === 'USER' ? props.loggedInUserId : undefined,
  'REQUESTED'
);

const {
  data: usingData,
  isSuccess: isUsingSuccess,
  isLoading: isUsingLoading,
  isError: isUsingError,
  isFetching: isUsingFetching,
} = getHistoryListQuery(
  props.userToken,
  props.curDeptId,
  props.userMode === 'USER' ? props.loggedInUserId : undefined,
  'USING'
);

const {
  data: lostData,
  isSuccess: isLostSuccess,
  isLoading: isLostLoading,
  isError: isLostError,
  isFetching: isLostFetching,
} = getHistoryListQuery(
  props.userToken,
  props.curDeptId,
  props.userMode === 'USER' ? props.loggedInUserId : undefined,
  'LOST'
);

const {
  data: returnedData,
  isSuccess: isReturnedSuccess,
  isLoading: isReturnedLoading,
  isError: isReturnedError,
  isFetching: isReturnedFetching,
  isFetchingNextPage: isReturnedFetchingNextPage,
  fetchNextPage: fetchReturnedNextPage,
  hasNextPage: hasReturnedNextPage,
} = getHistoryListInfiniteQuery(
  props.userToken,
  props.curDeptId,
  props.userMode === 'USER' ? props.loggedInUserId : undefined,
  'RETURNED',
  10
);
const {
  data: expiredData,
  isSuccess: isExpiredSuccess,
  isLoading: isExpiredLoading,
  isError: isExpiredError,
  isFetching: isExpiredFetching,
  isFetchingNextPage: isExpiredFetchingNextPage,
  fetchNextPage: fetchExpiredNextPage,
  hasNextPage: hasExpiredNextPage,
} = getHistoryListInfiniteQuery(
  props.userToken,
  props.curDeptId,
  props.userMode === 'USER' ? props.loggedInUserId : undefined,
  'EXPIRED',
  10
);

function fetchReturnedNextPageIfExist() {
  if (hasReturnedNextPage?.value) {
    fetchReturnedNextPage.value();
  }
}

function fetchExpiredNextPageIfExist() {
  if (hasExpiredNextPage?.value) {
    fetchExpiredNextPage.value();
  }
}

const isSuccess = computed(() => {
  return (
    isRequestedSuccess.value &&
    isUsingSuccess.value &&
    isLostSuccess.value &&
    isReturnedSuccess.value &&
    isExpiredSuccess.value
  );
});

const isLoading = computed(() => {
  return (
    isRequestedLoading.value ||
    isUsingLoading.value ||
    isLostLoading.value ||
    isReturnedLoading.value ||
    isExpiredLoading.value
  );
});

const isError = computed(() => {
  return (
    isRequestedError.value ||
    isUsingError.value ||
    isLostError.value ||
    isReturnedError.value ||
    isExpiredError.value
  );
});

const isFetching = computed(() => {
  return (
    isRequestedFetching.value ||
    isUsingFetching.value ||
    isLostFetching.value ||
    isReturnedFetching.value ||
    isExpiredFetching.value
  );
});

const categorizedHistories = computed(() => {
  const output: CategorizedHistorySet[] = [];
  if (requestedData.value !== undefined && requestedData.value.size > 0) {
    output.push({
      category: 'REQUESTED',
      histories: requestedData.value.toArray() || [],
    });
  }
  if (usingData.value !== undefined && usingData.value.size > 0) {
    output.push({
      category: 'USING',
      histories: usingData.value.toArray() || [],
    });
  }
  if (lostData.value !== undefined && lostData.value.size > 0) {
    output.push({
      category: 'LOST',
      histories: lostData.value.toArray() || [],
    });
  }
  if (returnedData.value !== undefined) {
    const returnedHistoryList: History[] = [];
    returnedData.value.pages.forEach((page) =>
      page.data.forEach((history) => returnedHistoryList.push(history))
    );

    if (returnedHistoryList.length > 0) {
      output.push({
        category: 'RETURNED',
        histories: returnedHistoryList,
      });
    }
  }
  if (expiredData.value !== undefined) {
    const expiredHistoryList: History[] = [];
    expiredData.value.pages.forEach((page) =>
      page.data.forEach((history) => expiredHistoryList.push(history))
    );

    if (expiredHistoryList.length > 0) {
      output.push({
        category: 'EXPIRED',
        histories: expiredHistoryList,
      });
    }
  }
  return output;
});

const selectedId = ref<string>(NIL_UUID);

const historyIdOnRoute = computed(() => {
  if (typeof route.query.historyId === 'string') {
    return route.query.historyId;
  }
  if (Array.isArray(route.query.historyId)) {
    return route.query.historyId.join('');
  }
  return NIL_UUID;
});

watch(
  historyIdOnRoute,
  () => {
    selectedId.value = historyIdOnRoute.value;
  },
  { immediate: true }
);
</script>

<template>
  <section class="desktop-frame">
    <HistoryPageOnEmpty
      v-if="!isLoading && !isError && isSuccess && categorizedHistories?.length === 0"
    ></HistoryPageOnEmpty>
    <CommonHistoryPageOnDesktop
      v-else
      :user-token="props.userToken"
      :selected-id="selectedId"
      :is-success="isSuccess"
      :is-loading="isLoading"
      :is-error="isError"
      :is-fetching="isFetching"
      :is-returned-fetching-next-page="isReturnedFetchingNextPage"
      :is-expired-fetching-next-page="isExpiredFetchingNextPage"
      :categorized-histories="categorizedHistories"
      :has-expired-next-page="hasExpiredNextPage ?? false"
      :has-returned-next-page="hasReturnedNextPage ?? false"
      @update-selected-id="(newSelectedId) => (selectedId = newSelectedId)"
      @fetch-returned-next-page="() => fetchReturnedNextPageIfExist()"
      @fetch-expired-next-page="() => fetchExpiredNextPageIfExist()"
    ></CommonHistoryPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <HistoryPageOnEmpty
      v-if="!isLoading && !isError && isSuccess && categorizedHistories?.length === 0"
    ></HistoryPageOnEmpty>
    <CommonHistoryPageOnMobile
      v-else
      :user-token="props.userToken"
      :selected-id="selectedId"
      :is-success="isSuccess"
      :is-loading="isLoading"
      :is-error="isError"
      :is-fetching="isFetching"
      :is-returned-fetching-next-page="isReturnedFetchingNextPage"
      :is-expired-fetching-next-page="isExpiredFetchingNextPage"
      :categorized-histories="categorizedHistories"
      :has-expired-next-page="hasExpiredNextPage ?? false"
      :has-returned-next-page="hasReturnedNextPage ?? false"
      @update-selected-id="(newSelectedId) => (selectedId = newSelectedId)"
      @fetch-returned-next-page="() => fetchReturnedNextPageIfExist()"
      @fetch-expired-next-page="() => fetchExpiredNextPageIfExist()"
    ></CommonHistoryPageOnMobile>
  </section>
</template>

<style lang="scss" scoped>
.history-page {
  height: 100%;
}

@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .desktop-frame {
    display: none;
  }

  .mobile-frame {
    display: block;

    width: 100%;
    height: 100%;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .desktop-frame {
    display: block;

    width: 100%;
    height: 100%;
  }

  .mobile-frame {
    display: none;
  }
}
</style>
