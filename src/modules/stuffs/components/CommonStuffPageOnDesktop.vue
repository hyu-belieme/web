<script setup lang="ts">
import type { List } from 'immutable';
import { toRef } from 'vue';

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
</script>

<template>
  <section class="tabs-wrapper">
    <section class="list-section">
      <StuffListTab
        :user-token="userToken"
        :cur-dept-id="curDeptId"
        :user-mode="userMode"
        :stuff-detail-view-mode="stuffDetailViewMode"
        :selected-id="selectedId"
        :is-success="isSuccess"
        :is-loading="isLoading"
        :is-error="isError"
        :is-fetching="isFetching"
        :stuffs="stuffs"
        @update-stuff-detail-view-mode="
          (newViewMode) => emit('updateStuffDetailViewMode', newViewMode)
        "
        @update-selected-id="(newSelectedId) => emit('updateSelectedId', newSelectedId)"
      ></StuffListTab>
    </section>
    <section class="detail-section">
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
  </section>
</template>

<style lang="scss" scoped>
$cropped100vh: calc(var(--vh, 1vh) * 100);
$list-height: calc($cropped100vh - $header-height-desktop);

.tabs-wrapper {
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 3);

  .list-section {
    width: 24rem;
    height: $list-height;
    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);
    position: sticky;
    top: 0;
  }

  .detail-section {
    width: 0;
    height: 100%;
    padding-top: map-get($map: $spacers, $key: 2);
    padding-bottom: map-get($map: $spacers, $key: 3);
    flex-grow: 1;
  }
}
</style>
