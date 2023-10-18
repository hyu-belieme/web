<script setup lang="ts">
import { storeToRefs } from 'pinia';

import TheModalFrame from '@common/components/modals/TheModalFrame/TheModalFrame.vue';
import useCurDeptStorage from '@common/storages/cur-dept-storage';

import TheHeader from '@^header/TheHeader.vue';
import TheModalFrame2 from '@^modal-frame/TheModalFrame.vue';

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <section class="d-flex flex-column w-100 h-100">
    <header class="d-flex flex-row align-items-center flex-grow-0">
      <TheHeader></TheHeader>
    </header>
    <main class="container pt-3 pb-3 flex-grow-1" :key="curDeptId">
      <RouterView />
    </main>
  </section>
  <TheModalFrame></TheModalFrame>
  <TheModalFrame2></TheModalFrame2>
</template>
