<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";

import { loading } from "@common/types/Loading";
import type { User } from "@common/types/Models";

import InfoListCell from "@^histories/components/HistoryDetailInfoListCell/HistoryDetailInfoListCell.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);

const timeToString = (time: number) => {
  return dayjs.unix(time).format("llll");
};

const nameAndStudentIdFormat = (user: User) => {
  return `${user.name} (${user.studentId})`;
};
</script>

<template>
  <template v-if="selectedHistory !== undefined && selectedHistory !== loading">
    <section class="info-list">
      <InfoListCell
        v-if="selectedHistory.requestedAt !== undefined"
        v-bind="{ keyword: '대여 요청된 시각', value: timeToString(selectedHistory.requestedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.approvedAt !== undefined"
        v-bind="{ keyword: '대여 승인된 시각', value: timeToString(selectedHistory.approvedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.lostAt !== undefined"
        v-bind="{ keyword: '분실 등록된 시각', value: timeToString(selectedHistory.lostAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.returnedAt !== undefined"
        v-bind="{ keyword: '반납 승인된 시각', value: timeToString(selectedHistory.returnedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.canceledAt !== undefined"
        v-bind="{ keyword: '취소된 시각', value: timeToString(selectedHistory.canceledAt) }"
      ></InfoListCell>
    </section>
    <section class="info-list">
      <InfoListCell
        v-if="selectedHistory.requester !== undefined"
        v-bind="{
          keyword: '대여 요청자',
          value: nameAndStudentIdFormat(selectedHistory.requester)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.approveManager !== undefined"
        v-bind="{
          keyword: '대여 승인 담당자',
          value: nameAndStudentIdFormat(selectedHistory.approveManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.lostManager !== undefined"
        v-bind="{
          keyword: '분실 등록 담당자',
          value: nameAndStudentIdFormat(selectedHistory.lostManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.returnManager !== undefined"
        v-bind="{
          keyword: '반납 승인 담당자',
          value: nameAndStudentIdFormat(selectedHistory.returnManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="selectedHistory.cancelManager !== undefined"
        v-bind="{
          keyword: '취소 요청자',
          value: nameAndStudentIdFormat(selectedHistory.cancelManager)
        }"
      ></InfoListCell>
    </section>
  </template>
</template>

<style lang="scss" scoped>
.info-list {
  display: flex;
  flex-direction: column;
}
</style>
