<script setup lang="ts">
import { storeToRefs } from 'pinia';

import TheGuideFrame from '@common/components/guide-popovers/TheGuideFrame/TheGuideFrame.vue';
import TheModalFrame from '@common/components/modals/TheModalFrame/TheModalFrame.vue';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import TheHeader from '@^header/TheHeader.vue';

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <section class="d-flex flex-column w-100 h-100">
    <header class="d-flex flex-row align-items-center flex-grow-0 m-auto">
      <TheHeader></TheHeader>
    </header>
    <main class="container main-frame" :key="curDeptId">
      <RouterView />
    </main>
  </section>
  <TheModalFrame></TheModalFrame>
  <TheGuideFrame></TheGuideFrame>
</template>

<style lang="scss" scoped>
.main-frame {
  flex-grow: 1;

  overflow: scroll;
}

@include media-breakpoint-up('tablet-landscape') {
  .main-frame {
    flex-grow: 1;
  }
}
</style>
