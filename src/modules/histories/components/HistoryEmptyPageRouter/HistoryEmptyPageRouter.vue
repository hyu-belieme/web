<script setup lang="ts">
import HistoryPageOnCommon from '@^histories/components/HistoryPageOnCommon/HistoryPageOnCommon.vue';
import HistoryPageOnEmpty from '@^histories/components/HistoryPageOnEmpty/HistoryPageOnEmpty.vue';
import { getHistoryListQuery } from '@^histories/components/utils/history-query-utils';

const { data, isLoading, isError, isSuccess } = getHistoryListQuery();
</script>

<template>
  <HistoryPageOnCommon
    v-if="isLoading || isError || (isSuccess && data?.size !== 0)"
  ></HistoryPageOnCommon>
  <HistoryPageOnEmpty v-else></HistoryPageOnEmpty>
</template>

<style lang="scss" scoped></style>
