<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import StuffAddTab from '@^stuffs/components/StuffAddTab.vue';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <section class="w-100 h-100 pt-2 pb-3 overflow-scroll">
    <StuffAddTab :user-token="userToken" :cur-dept-id="curDeptId"></StuffAddTab>
  </section>
</template>

<style lang="scss" scoped></style>
