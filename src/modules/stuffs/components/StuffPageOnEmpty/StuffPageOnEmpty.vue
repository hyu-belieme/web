<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/newUserStore";

import StuffDetail from "@^stuffs/components/StuffDetailSection/StuffDetailSection.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;
</script>

<template>
  <section class="empty-page">
    <template v-if="viewMode !== 'ADD'">
      <section class="empty-page-content">
        <span class="text-center">아직 물품이 등록되지 않았습니다. 조금만 기다려주세요!</span>
        <button
          v-if="userMode === 'STAFF' || userMode === 'MASTER'"
          class="btn btn-primary btn-sm"
          @click="viewModeStore.changeStuffDetailViewMode('ADD')"
        >
          물품 등록하기
        </button>
      </section>
    </template>
    <template v-else>
      <StuffDetail></StuffDetail>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.empty-page {
  position: relative;
  width: 100%;
  height: 100%;

  background-color: $white;

  .empty-page-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: map-get($map: $spacers, $key: 2);
  }
}
</style>
