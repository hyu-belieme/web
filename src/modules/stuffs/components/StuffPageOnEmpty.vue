<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import useUserModeStorage from '@common/storages/user-mode-storage';

const userModeStorage = useUserModeStorage();
const { userMode } = storeToRefs(userModeStorage);

const router = useRouter();
</script>

<template>
  <section class="empty-page">
    <section class="empty-page-content">
      <span class="text-center">아직 물품이 등록되지 않았습니다.</span>
      <BasicButton
        v-if="userMode === 'STAFF'"
        class="m-2"
        @click="router.push('/stuffs/first-register')"
        :size="'sm'"
        :content="'물품 등록하기'"
      >
      </BasicButton>
      <span v-else class="text-center">조금만 기다려주세요!</span>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.empty-page {
  position: relative;
  width: 100%;
  height: 100%;

  .empty-page-content {
    color: $gray-700;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
