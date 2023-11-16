<script setup lang="ts">
import { storeToRefs } from 'pinia';

import TheModalFrame from '@common/components/modals/TheModalFrame/TheModalFrame.vue';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import TheHeader from '@^header/TheHeader.vue';

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <section class="d-flex flex-column w-100 h-100">
    <header class="d-flex flex-row align-items-center flex-grow-0">
      <TheHeader></TheHeader>
    </header>
    <main class="container main-frame" :key="curDeptId">
      <RouterView />
    </main>
  </section>
  <TheModalFrame></TheModalFrame>
</template>

<style lang="scss" scoped>
.main-frame {
  padding-bottom: map-get($spacers, 3);

  flex-grow: 1;
}

@include media-breakpoint-up('tablet-landscape') {
  .main-frame {
    padding-top: map-get($spacers, 3);
    padding-bottom: map-get($spacers, 3);

    flex-grow: 1;
  }
}
</style>
