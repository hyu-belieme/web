<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';

import useBackButtonFunction from '@common/stores/back-button-function-store';

import useMobileCurrentStuffPage from '@^stuffs/stores/mobile-current-stuff-page-store';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';

const mobileCurrentStuffPageStore = useMobileCurrentStuffPage();
const { mobileCurrentStuffPage } = storeToRefs(mobileCurrentStuffPageStore);

const backButtonFunctionStore = useBackButtonFunction();

const stuffDetailViewModeStore = useStuffDetailViewModeStore();

function stuffPageBackButton() {
  stuffDetailViewModeStore.changeStuffDetailViewMode('SHOW');
  mobileCurrentStuffPageStore.changeMobileCurrentStuffPage('LIST');
  backButtonFunctionStore.updateBackButtonFunction(undefined);
}

onMounted(() => {
  if (mobileCurrentStuffPage.value === 'DETAIL') {
    backButtonFunctionStore.updateBackButtonFunction(stuffPageBackButton);
  }
});

onUnmounted(() => {
  backButtonFunctionStore.updateBackButtonFunction(undefined);
});
</script>

<template>
  <!-- <section class="stuff-page"> -->
  <RouterView />
  <!-- </section> -->
</template>

<style lang="scss" scoped>
.stuff-page {
  height: 100%;
}
</style>
