<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useUserModeStore from '@common/stores/user-mode-store';

import HistoryPageFrameRouter from '@^histories/components/HistoryPageFrameRouter.vue';

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);
</script>

<template>
  <section class="history-page" :key="userMode">
    <HistoryPageFrameRouter :user-mode="userMode"></HistoryPageFrameRouter>
  </section>
</template>

<style lang="scss" scoped>
.history-page {
  height: 100%;
}
</style>
