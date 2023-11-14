<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useUserModeStore from '@common/stores/user-mode-store';

import HistoryEmptyPageRouter from '@^histories/components/HistoryEmptyPageRouter/HistoryEmptyPageRouter.vue';

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);
</script>

<template>
  <section class="history-page" :key="userMode">
    <HistoryEmptyPageRouter></HistoryEmptyPageRouter>
  </section>
</template>

<style lang="scss" scoped>
.history-page {
  height: 100%;
}
</style>
