<script setup lang="ts">
import HistoryInfoList from "@/components/HistoryInfoList.vue";
import { useHistoryStore } from "@/stores/historyStore";
import { storeToRefs } from "pinia";
import { loading } from "@/models/Types";
import Loading from "@/components/Loading.vue";
import DataLoadFail from "@/components/DataLoadFail.vue";

const isStaff = false;

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);
</script>

<template>
  <section class="history-info">
    <template v-if="selectedHistory == loading">
      <Loading></Loading>
    </template>
    <template v-else-if="selectedHistory == undefined">
      <DataLoadFail></DataLoadFail>
    </template>
    <template v-else>
      <section class="label">
        <section class="icon">{{ selectedHistory.item.stuff.thumbnail }}</section>
        <section class="name">
          {{ selectedHistory.item.stuff.name }} #{{ selectedHistory.item.num }}
        </section>
      </section>
      <HistoryInfoList></HistoryInfoList>
      <section class="buttons">
        <template v-if="selectedHistory.status == 'REQUESTED'">
          <button v-if="isStaff" class="btn btn-primary btn-sm">승인하기</button>
          <button class="btn btn-danger btn-sm">취소하기</button>
        </template>
        <template v-else-if="selectedHistory.status == 'USING'">
          <button v-if="isStaff" class="btn btn-primary btn-sm">반납하기</button>
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
