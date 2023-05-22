<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMutation, useQuery, useQueryClient } from "vue-query";

import { approveItem, cancelItem, getHistory, returnItem } from "@common/apis/newBeliemeApis";
import { historyKeys } from "@common/apis/queryKeys";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import { useModalStore } from "@common/stores/modalStore";
import { useUserStore } from "@common/stores/userStore";
import type { BeliemeError, History } from "@common/types/Models";

import { useHistoryStore } from "@^histories/stores/historyStore";

const modalStore = useModalStore();

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const historyStore = useHistoryStore();
const { selectedId } = storeToRefs(historyStore);

const { isSuccess, data } = useQuery(historyKeys.detail(), () => getHistory(selectedId.value));

const queryClient = useQueryClient();

const rentalApproveMutation = _changeItemRequestMutation(() => approveItem(selectedId.value));

const cancelRequestMutation = _changeItemRequestMutation(() => cancelItem(selectedId.value));

const returnApproveMutation = _changeItemRequestMutation(() => returnItem(selectedId.value));

const rentalApproveModal = {
  key: "rentalApprove",
  component: BasicModal,
  props: {
    title: "대여 승인하기",
    content:
      "신청자의 학생증을 확인 후에 물품을 빌려주었나요? 승인을 하면 기록이 저장되며 해당 기록은 사라지지 않습니다.",
    resolveLabel: "승인하기"
  },
  resolve: (_: any, key: string) => {
    rentalApproveMutation.mutate();
    modalStore.removeModal(key);
  }
};

const requestCancelModal = {
  key: "requestCancel",
  component: BasicModal,
  props: {
    title: "신청 취소하기",
    content: "신청을 취소할 경우 해당 물품을 다른 사람이 대여할 수 있게 됩니다. 취소하시겠습니까?",
    resolveLabel: "취소하기"
  },
  resolve: (_: any, key: string) => {
    cancelRequestMutation.mutate();
    modalStore.removeModal(key);
  }
};

const returnApproveModal = {
  key: "returnApprove",
  component: BasicModal,
  props: {
    title: "반납 승인하기",
    content:
      "대여해 준 물품을 받으셨나요? 반납 승인 시 해당 물품은 다시 대여 가능해 지고 이를 되돌릴 수 없습니다.",
    resolveLabel: "승인하기"
  },
  resolve: (_: any, key: string) => {
    returnApproveMutation.mutate();
    modalStore.removeModal(key);
  }
};

function _changeItemRequestMutation(mutationFn: () => Promise<History>) {
  return useMutation<History, BeliemeError>(mutationFn, {
    onSettled: () => {
      queryClient.invalidateQueries(historyKeys.list());
      queryClient.invalidateQueries(historyKeys.detail());
      historyStore.updateSelected(0, 0);
    },
    onError: (error) => {
      console.error(error);
      modalStore.addModal(buildAlertModal("errorAlert", error.message));
    }
  });
}
</script>

<template>
  <section v-if="isSuccess" class="buttons">
    <template v-if="data?.status === 'REQUESTED'">
      <button
        v-if="userMode === 'STAFF' || userMode === 'MASTER'"
        class="btn btn-primary btn-sm"
        @click="modalStore.addModal(rentalApproveModal)"
      >
        대여 승인
      </button>
      <button class="btn btn-danger btn-sm" @click="modalStore.addModal(requestCancelModal)">
        신청 취소
      </button>
    </template>
    <template v-else-if="data?.status === 'USING' || data?.status === 'DELAYED'">
      <button
        v-if="userMode === 'STAFF' || userMode === 'MASTER'"
        class="btn btn-primary btn-sm"
        @click="modalStore.addModal(returnApproveModal)"
      >
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
