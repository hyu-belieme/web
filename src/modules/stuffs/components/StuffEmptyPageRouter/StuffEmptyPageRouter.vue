<script setup lang="ts">
import StuffPageOnCommon from '@^stuffs/components/StuffPageOnCommon/StuffPageOnCommon.vue';
import StuffPageOnEmpty from '@^stuffs/components/StuffPageOnEmpty/StuffPageOnEmpty.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';

const { data, isLoading, isError, isSuccess } = getStuffListQuery();
</script>

<template>
  <StuffPageOnCommon
    v-if="isLoading || isError || (isSuccess && data?.size !== 0)"
  ></StuffPageOnCommon>
  <StuffPageOnEmpty v-else></StuffPageOnEmpty>
</template>

<style lang="scss" scoped></style>
