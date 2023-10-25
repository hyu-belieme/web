<script setup lang="ts">
import { storeToRefs } from 'pinia';

import StuffDetail from '@^stuffs/components/StuffDetailSection/StuffDetailSection.vue';
import StuffPageOnCommon from '@^stuffs/components/StuffPageOnCommon/StuffPageOnCommon.vue';
import StuffPageOnEmpty from '@^stuffs/components/StuffPageOnEmpty/StuffPageOnEmpty.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';

const { data, isLoading, isError, isSuccess } = getStuffListQuery();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;
</script>

<template>
  <StuffDetail v-if="viewMode === 'INITIAL_ADD'" inherit-status="Success"></StuffDetail>
  <StuffPageOnCommon v-else-if="isLoading || isError"></StuffPageOnCommon>
  <StuffPageOnEmpty v-else-if="isSuccess && data?.size === 0"></StuffPageOnEmpty>
  <StuffPageOnCommon v-else></StuffPageOnCommon>
</template>

<style lang="scss" scoped></style>
