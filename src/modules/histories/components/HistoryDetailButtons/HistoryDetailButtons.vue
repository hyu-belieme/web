<script setup lang="ts">
import { storeToRefs } from "pinia";

import { approveItem, cancelItem, returnItem } from "@common/apis/beliemeApis";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import { useDeptStore } from "@common/stores/deptStore";
import { useModalStore } from "@common/stores/modalStore";
import { useUserStore } from "@common/stores/userStore";
import { loading } from "@common/types/Loading";

import { useHistoryStore } from "@^histories/stores/historyStore";

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const historyStore = useHistoryStore();
const { selectedHistory } = storeToRefs(historyStore);

const modalStore = useModalStore();

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

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
    _addChangeItemRequestHandler(approveItem(_getItemOfSelectedHistoryIndex()));
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
    _addChangeItemRequestHandler(cancelItem(_getItemOfSelectedHistoryIndex()));
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
    _addChangeItemRequestHandler(returnItem(_getItemOfSelectedHistoryIndex()));
    modalStore.removeModal(key);
  }
};

const _addChangeItemRequestHandler = (promise: Promise<any>) => {
  promise
    .then(() => {
      historyStore.turnOnReloadFlag(true);
    })
    .catch((error) => {
      console.error(error);
      if (error.response)
        modalStore.addModal(buildAlertModal("errorAlert", error.response.data.message));
      else modalStore.addModal(_networkErrorAlert);
    });
};

const _getItemOfSelectedHistoryIndex = () => {
  let stuffName = "",
    itemNum = 0;
  if (selectedHistory.value !== loading && selectedHistory.value !== undefined) {
    stuffName = selectedHistory.value.item.stuff.name;
    itemNum = selectedHistory.value.item.num;
  }
  return {
    ...deptId.value,
    stuffName: stuffName,
    itemNum: itemNum
  };
};

const _networkErrorAlert = buildAlertModal(
  "networkErrorAlert",
  "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
);
</script>

<template>
  <section v-if="selectedHistory !== loading && selectedHistory !== undefined" class="buttons">
    <template v-if="selectedHistory.status === 'REQUESTED'">
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
    <template
      v-else-if="selectedHistory.status === 'USING' || selectedHistory.status === 'DELAYED'"
    >
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
