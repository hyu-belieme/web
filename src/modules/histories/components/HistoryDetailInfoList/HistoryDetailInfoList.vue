<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";
import { useQuery } from "vue-query";

import { getHistory } from "@common/apis/newBeliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import type { User } from "@common/types/Models";

import InfoListCell from "@^histories/components/HistoryDetailInfoListCell/HistoryDetailInfoListCell.vue";
import { useHistoryStore } from "@^histories/stores/historyStore";

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

const { isSuccess, data } = useQuery(historyKeys.detail(), () => getHistory(selectedId.value));

const timeToString = (time: number) => {
  return dayjs.unix(time).format("llll");
};

const nameAndStudentIdFormat = (user: User) => {
  return `${user.name} (${user.studentId})`;
};
</script>

<template>
  <template v-if="isSuccess">
    <section class="info-list">
      <InfoListCell
        v-if="data?.requestedAt !== undefined"
        v-bind="{ keyword: '대여 요청된 시각', value: timeToString(data?.requestedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.approvedAt !== undefined"
        v-bind="{ keyword: '대여 승인된 시각', value: timeToString(data?.approvedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.lostAt !== undefined"
        v-bind="{ keyword: '분실 등록된 시각', value: timeToString(data?.lostAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.returnedAt !== undefined"
        v-bind="{ keyword: '반납 승인된 시각', value: timeToString(data?.returnedAt) }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.canceledAt !== undefined"
        v-bind="{ keyword: '취소된 시각', value: timeToString(data?.canceledAt) }"
      ></InfoListCell>
    </section>
    <section class="info-list">
      <InfoListCell
        v-if="data?.requester !== undefined"
        v-bind="{
          keyword: '대여 요청자',
          value: nameAndStudentIdFormat(data?.requester)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.approveManager !== undefined"
        v-bind="{
          keyword: '대여 승인 담당자',
          value: nameAndStudentIdFormat(data?.approveManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.lostManager !== undefined"
        v-bind="{
          keyword: '분실 등록 담당자',
          value: nameAndStudentIdFormat(data?.lostManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.returnManager !== undefined"
        v-bind="{
          keyword: '반납 승인 담당자',
          value: nameAndStudentIdFormat(data?.returnManager)
        }"
      ></InfoListCell>
      <InfoListCell
        v-if="data?.cancelManager !== undefined"
        v-bind="{
          keyword: '취소 요청자',
          value: nameAndStudentIdFormat(data?.cancelManager)
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
