<script setup lang="ts">
import { ref } from 'vue';

import LoadingView from '@common/components/LoadingView/LoadingView.vue';

import LoginBox from '@^login/LoginBox/LoginBox.vue';

const isLoading = ref(false);
</script>

<template>
  <section class="login-page">
    <LoadingView v-if="isLoading"></LoadingView>
    <LoginBox v-else></LoginBox>
  </section>
</template>

<style scoped lang="scss">
.login-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);
}
</style>
