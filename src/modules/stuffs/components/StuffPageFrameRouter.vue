<script setup lang="ts">
import { NIL as NIL_UUID } from 'uuid';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type UserMode from '@common/types/UserMode';

import CommonStuffPageOnDesktop from '@^stuffs/components/CommonStuffPageOnDesktop.vue';
import CommonStuffPageOnMobile from '@^stuffs/components/CommonStuffPageOnMobile.vue';
import StuffPageOnEmpty from '@^stuffs/components/StuffPageOnEmpty.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import type { StuffDetailViewMode } from '@^stuffs/types/StuffDetailViewMode';

const props = defineProps<{
  userToken: string;
  curDeptId: string;
  userMode: UserMode;
}>();

const route = useRoute();

const stuffDetailViewMode = ref<StuffDetailViewMode>('SHOW');
const selectedId = ref<string>(NIL_UUID);

const { isSuccess, isLoading, isError, isFetching, data } = getStuffListQuery(
  props.userToken,
  props.curDeptId
);

function updateSelectedId(newSelectedId: string) {
  selectedId.value = newSelectedId;
}

const stuffIdOnRoute = computed(() => {
  if (typeof route.query.stuffId === 'string') {
    return route.query.stuffId;
  }
  if (Array.isArray(route.query.stuffId)) {
    return route.query.stuffId.join('');
  }
  return NIL_UUID;
});

watch(
  stuffIdOnRoute,
  () => {
    updateSelectedId(stuffIdOnRoute.value);
  },
  { immediate: true }
);
</script>

<template>
  <section class="desktop-frame">
    <StuffPageOnEmpty
      v-if="!isLoading && !isError && isSuccess && data?.size === 0"
    ></StuffPageOnEmpty>
    <CommonStuffPageOnDesktop
      v-else
      :user-token="userToken"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      :stuff-detail-view-mode="stuffDetailViewMode"
      :selected-id="selectedId"
      :is-success="isSuccess"
      :is-loading="isLoading"
      :is-error="isError"
      :is-fetching="isFetching"
      :stuffs="data"
      @update-stuff-detail-view-mode="(newViewMode) => (stuffDetailViewMode = newViewMode)"
      @update-selected-id="(newSelectedId) => updateSelectedId(newSelectedId)"
    ></CommonStuffPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <StuffPageOnEmpty
      v-if="!isLoading && !isError && isSuccess && data?.size === 0"
    ></StuffPageOnEmpty>
    <CommonStuffPageOnMobile
      v-else
      :user-token="userToken"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      :stuff-detail-view-mode="stuffDetailViewMode"
      :selected-id="selectedId"
      :is-success="isSuccess"
      :is-loading="isLoading"
      :is-error="isError"
      :is-fetching="isFetching"
      :stuffs="data"
      @update-stuff-detail-view-mode="(newViewMode) => (stuffDetailViewMode = newViewMode)"
      @update-selected-id="(newSelectedId) => updateSelectedId(newSelectedId)"
    ></CommonStuffPageOnMobile>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .desktop-frame {
    display: none;
  }

  .mobile-frame {
    display: block;

    width: 100%;
    height: 100%;
    padding-bottom: map-get($spacers, 3);
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
