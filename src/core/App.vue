<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useDeptStore from '@common/stores/dept-store';

import TheHeader from '@^header/TheHeader.vue';
import TheModalFrame from '@^modal-frame/TheModalFrame.vue';

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);
</script>

<template>
  <header class="d-flex flex-row align-items-center container">
    <TheHeader></TheHeader>
  </header>
  <main class="container" :key="deptId">
    <RouterView />
  </main>
  <TheModalFrame></TheModalFrame>
</template>
