<script setup lang="ts">
import DataLoadFailView from "@common/components/DataLoadFailView/DataLoadFailView.vue";
import LoadingView from "@common/components/LoadingView/LoadingView.vue";
import { useUserModeStore } from "@common/stores/userModeStore";
import { loading } from "@common/types/Loading";

import InfoList from "@^histories/components/HistoryDetailContentInfoList/HistoryDetailContentInfoList.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);
</script>

<template>
  <section class="history-info">
    <template v-if="selectedHistory === loading">
      <LoadingView></LoadingView>
    </template>
    <template v-else-if="selectedHistory === undefined">
      <DataLoadFailView></DataLoadFailView>
    </template>
    <template v-else>
      <section class="label">
        <section class="icon">{{ selectedHistory.item.stuff.thumbnail }}</section>
        <section class="name">
          {{ selectedHistory.item.stuff.name }} #{{ selectedHistory.item.num }}
        </section>
      </section>
      <InfoList></InfoList>
      <section class="buttons">
        <template v-if="selectedHistory.status === 'REQUESTED'">
          <button
            v-if="userMode === 'STAFF' || userMode === 'MASTER'"
            class="btn btn-primary btn-sm"
          >
            대여 승인
          </button>
          <button class="btn btn-danger btn-sm">신청 취소</button>
        </template>
        <template v-else-if="selectedHistory.status === 'USING'">
          <button
            v-if="userMode === 'STAFF' || userMode === 'MASTER'"
            class="btn btn-primary btn-sm"
          >
            반납 확인
          </button>
        </template>
      </section>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.history-info {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);

  .label {
    $label-height: 4rem;

    width: 100%;
    height: $label-height;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .icon {
      line-height: $label-height;
      font-size: $h1-font-size;
    }

    .name {
      line-height: $label-height;
      font-size: $h3-font-size;
      flex-grow: 1;
    }
  }

  .info-list {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: map-get($map: $spacers, $key: 2);
  }
}
</style>
