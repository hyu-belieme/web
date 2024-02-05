<script setup lang="ts">
import type { List } from 'immutable';
import { NIL as NIL_UUID } from 'uuid';
import { computed, toRef } from 'vue';
import { useRoute } from 'vue-router';

import type Stuff from '@common/models/Stuff';
import type UserMode from '@common/types/UserMode';

import StuffDetailTab from '@^stuffs/components/StuffDetailTab.vue';
import StuffListTab from '@^stuffs/components/StuffListTab.vue';
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

const route = useRoute();

const stuffIdOnRoute = computed(() => {
  if (typeof route.query.stuffId === 'string') {
    return route.query.stuffId;
  }
  if (Array.isArray(route.query.stuffId)) {
    return route.query.stuffId.join('');
  }
  return NIL_UUID;
});

function doesStuffExist(currentId: string) {
  if (stuffs.value === undefined || stuffs.value.isEmpty()) return false;
  return stuffs.value.some((value) => value.id === currentId);
}
</script>

<template>
  <StuffListTab
    v-if="!doesStuffExist(stuffIdOnRoute)"
    :user-token="userToken"
    :stuff-detail-view-mode="stuffDetailViewMode"
    :selected-id="selectedId"
    :is-success="isSuccess"
    :is-loading="isLoading"
    :is-error="isError"
    :is-fetching="isFetching"
    :stuffs="stuffs"
    @update-stuff-detail-view-mode="(newViewMode) => emit('updateStuffDetailViewMode', newViewMode)"
    @update-selected-id="(newSelectedId) => emit('updateSelectedId', newSelectedId)"
  ></StuffListTab>
  <section v-else class="pb-3">
    <StuffDetailTab
      :key="selectedId"
      :user-token="userToken"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
      :stuff-detail-view-mode="stuffDetailViewMode"
      :selected-id="selectedId"
      :is-list-success="isSuccess"
      :is-list-loading="isLoading"
      :is-list-error="isError"
      @update-stuff-detail-view-mode="
        (newViewMode) => emit('updateStuffDetailViewMode', newViewMode)
      "
    ></StuffDetailTab>
  </section>
</template>

<style lang="scss" scoped></style>
