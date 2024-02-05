<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserModeStorage from '@common/storages/user-mode-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import StuffPageFrameRouter from '@^stuffs/components/StuffPageFrameRouter.vue';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);
</script>

<template>
  <StuffPageFrameRouter
    :key="userToken + userMode + curDeptId"
    :user-token="userToken"
    :cur-dept-id="curDeptId"
    :user-mode="userMode"
  ></StuffPageFrameRouter>
</template>

<style lang="scss" scoped></style>
