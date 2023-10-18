<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import StuffDetail from '@^stuffs/components/StuffDetailSection/StuffDetailSection.vue';
import StuffList from '@^stuffs/components/StuffList/StuffList.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const { isLoading, isSuccess, isFetching } = getStuffListQuery();

const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return 'Loading';
  if (isSuccess.value) return 'Success';
  return 'Error';
});
</script>

<template>
  <StuffList></StuffList>
  <StuffDetail :inherit-status="dataLoadStatus" :key="selectedId"></StuffDetail>
</template>

<style lang="scss" scoped></style>
