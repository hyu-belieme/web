<script setup lang="ts">
import { loading } from "@common/types/Loading";
import type { User } from "@common/types/Models";

import InfoCell from "@^histories/components/DetailHistoryContentInfoListCell/DetailHistoryContentInfoListCell.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";

const app = getCurrentInstance();
const dayjs = app?.appContext.config.globalProperties.$dayjs;

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
      <InfoCell
        v-if="selectedHistory.requestedAt !== undefined"
        v-bind="{ keyword: '대여 요청된 시각', value: timeToString(selectedHistory.requestedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.approvedAt !== undefined"
        v-bind="{ keyword: '대여 승인된 시각', value: timeToString(selectedHistory.approvedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.lostAt !== undefined"
        v-bind="{ keyword: '분실 등록된 시각', value: timeToString(selectedHistory.lostAt) }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.returnedAt !== undefined"
        v-bind="{ keyword: '반납 승인된 시각', value: timeToString(selectedHistory.returnedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.canceledAt !== undefined"
        v-bind="{ keyword: '취소된 시각', value: timeToString(selectedHistory.canceledAt) }"
      ></InfoCell>
    </section>
    <section class="info-list">
      <InfoCell
        v-if="selectedHistory.requester !== undefined"
        v-bind="{
          keyword: '대여 요청자',
          value: nameAndStudentIdFormat(selectedHistory.requester)
        }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.approveManager !== undefined"
        v-bind="{
          keyword: '대여 승인 담당자',
          value: nameAndStudentIdFormat(selectedHistory.approveManager)
        }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.lostManager !== undefined"
        v-bind="{
          keyword: '분실 등록 담당자',
          value: nameAndStudentIdFormat(selectedHistory.lostManager)
        }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.returnManager !== undefined"
        v-bind="{
          keyword: '반납 승인 담당자',
          value: nameAndStudentIdFormat(selectedHistory.returnManager)
        }"
      ></InfoCell>
      <InfoCell
        v-if="selectedHistory.cancelManager !== undefined"
        v-bind="{
          keyword: '취소 요청자',
          value: nameAndStudentIdFormat(selectedHistory.cancelManager)
        }"
      ></InfoCell>
    </section>
  </template>
</template>
