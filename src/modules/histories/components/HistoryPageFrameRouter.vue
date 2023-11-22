<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import CommonHistoryPageOnDesktop from '@^histories/components/CommonHistoryPageOnDesktop.vue';
import HistoryDetailTab from '@^histories/components/HistoryDetailTab.vue';
import HistoryListTab from '@^histories/components/HistoryListTab.vue';
import HistoryPageOnEmpty from '@^histories/components/HistoryPageOnEmpty.vue';
import {
  getHistoryListQueryForStaffMode,
  getHistoryListQueryForUserMode,
} from '@^histories/components/utils/history-query-utils';
import useHistorySelectedStore from '@^histories/stores/history-selected-store';

const route = useRoute();

const props = defineProps<{
  userMode: 'USER' | 'STAFF';
}>();

const { data, isSuccess } =
  props.userMode === 'USER' ? getHistoryListQueryForUserMode() : getHistoryListQueryForStaffMode();

const historySelectedStore = useHistorySelectedStore();
const { selectedId } = storeToRefs(historySelectedStore);

const historyIdOnRoute = computed(() => {
  if (typeof route.query.historyId === 'string') {
    return route.query.historyId;
  }
  if (Array.isArray(route.query.historyId)) {
    return route.query.historyId.join('');
  }
  return NIL_UUID;
});

const doesHistoryExist = computed(() => {
  if (data.value === undefined || data.value.isEmpty()) return false;
  return data.value.some((value) => value.id === historyIdOnRoute.value);
});

watch(
  historyIdOnRoute,
  () => {
    historySelectedStore.updateSelectedId(historyIdOnRoute.value);
  },
  { immediate: true }
);
</script>

<template>
  <section class="desktop-frame">
    <HistoryPageOnEmpty v-if="isSuccess && data?.size === 0"></HistoryPageOnEmpty>
    <CommonHistoryPageOnDesktop v-else></CommonHistoryPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <HistoryPageOnEmpty v-if="isSuccess && data?.size === 0"></HistoryPageOnEmpty>
    <HistoryListTab v-else-if="!doesHistoryExist"></HistoryListTab>
    <HistoryDetailTab v-else :key="selectedId"></HistoryDetailTab>
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
