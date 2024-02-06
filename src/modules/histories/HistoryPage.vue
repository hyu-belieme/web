<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserModeStorage from '@common/storages/user-mode-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

import HistoryPageFrameRouter from '@^histories/components/HistoryPageFrameRouter.vue';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const loggedInUserStorage = useLoggedInUserStorage();
const { loggedInUserId } = storeToRefs(loggedInUserStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);
</script>

<template>
  <section class="history-page">
    <HistoryPageFrameRouter
      :key="userToken + loggedInUserId + userMode + curDeptId"
      :user-token="userToken"
      :logged-in-user-id="loggedInUserId"
      :cur-dept-id="curDeptId"
      :user-mode="userMode"
    ></HistoryPageFrameRouter>
  </section>
</template>

<style lang="scss" scoped>
.history-page {
  height: 100%;
}
</style>
