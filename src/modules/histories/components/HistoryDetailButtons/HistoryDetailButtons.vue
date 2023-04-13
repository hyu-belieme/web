<script setup lang="ts">
import { useUserModeStore } from "@common/stores/userModeStore";
import { loading } from "@common/types/Loading";

import { useHistoryStore } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);
</script>

<template>
  <section v-if="selectedHistory !== loading && selectedHistory !== undefined" class="buttons">
    <template v-if="selectedHistory.status === 'REQUESTED'">
      <button v-if="userMode === 'STAFF' || userMode === 'MASTER'" class="btn btn-primary btn-sm">
        대여 승인
      </button>
      <button class="btn btn-danger btn-sm">신청 취소</button>
    </template>
    <template v-else-if="selectedHistory.status === 'USING'">
      <button v-if="userMode === 'STAFF' || userMode === 'MASTER'" class="btn btn-primary btn-sm">
        반납 확인
      </button>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: map-get($map: $spacers, $key: 2);
}
</style>
