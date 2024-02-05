<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import FirstStuffAddTab from '@^stuffs/components/FirstStuffAddTab.vue';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <FirstStuffAddTab :user-token="userToken" :cur-dept-id="curDeptId"></FirstStuffAddTab>
</template>

<style lang="scss" scoped></style>
