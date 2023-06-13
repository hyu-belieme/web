<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useCurDeptStorage from '@common/storages/cur-dept-storage';

import TheHeader from '@^header/TheHeader.vue';
import TheModalFrame from '@^modal-frame/TheModalFrame.vue';

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <TheHeader></TheHeader>
  </header>
  <main class="container" :key="curDeptId">
    <RouterView />
  </main>
  <TheModalFrame></TheModalFrame>
</template>
