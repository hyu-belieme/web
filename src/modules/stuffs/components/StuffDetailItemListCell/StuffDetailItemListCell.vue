<script setup lang="ts">
import type { AxiosResponse } from "axios";
import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";

import { rentItem, reportLostItem, returnItem } from "@common/apis/beliemeApis";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import InfoTag from "@common/components/InfoTag/InfoTag.vue";
import { useModalStore } from "@common/stores/modalStore";
import { useUserStore } from "@common/stores/userStore";
import { loading } from "@common/types/Loading";
import type { ItemInfoOnly } from "@common/types/Models";

import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

const TAG_SIZE = 6;

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const stuffStore = useStuffStore();
const { selectedStuff } = storeToRefs(stuffStore);

const modalStore = useModalStore();

const univCode = "HYU";
const deptCode = "CSE";

const props = defineProps<{
  item: ItemInfoOnly;
  isNew: boolean;
}>();

const emit = defineEmits(["popItem"]);

const rentalRequestModal = {
  key: "rentalRequest",
  component: BasicModal,
  props: {
    title: "대여 신청하기",
    content:
      "신청을 한 후에 대여장소에서 관리자를 통해 대여 승인을 받고 대여 할 수 있습니다. 단, 해당 신청은 15분 후에 자동으로 만료됩니다.",
    resolveLabel: "신청하기"
  },
  resolve: (_: any, key: string) => {
    _addChangeItemRequestHandler(
      rentItem(univCode, deptCode, _getSelectedStuffName(), props.item.num)
    );
    modalStore.removeModal(key);
  }
};

const lostRequestModal = {
  key: "lostRequest",
  component: BasicModal,
  props: {
    title: "분실 등록하기",
    content:
      "해당 물품을 분실하셨나요? 분실 등록 시 해당 물품은 사용 불가능 한 상태가 됩니다. 물품을 되찾게 된다면 반환 처리를 할 수 있지만 분실 기록은 남게 됩니다.",
    resolveLabel: "등록하기"
  },
  resolve: (_: any, key: string) => {
    _addChangeItemRequestHandler(
      reportLostItem(univCode, deptCode, _getSelectedStuffName(), props.item.num)
    );
    modalStore.removeModal(key);
  }
};

const foundApproveModal = {
  key: "foundApprove",
  component: BasicModal,
  props: {
    title: "반환 확인하기",
    content:
      "분실한 물품을 찾으셨나요? 반환 확인 시 해당 묾품이 다시 사용가능해 집니다. 다시 물품을 분실된 상태로 만들 수 있지만 그렇게 할 시 새로운 기록은 남게 됩니다.",
    resolveLabel: "확인하기"
  },
  resolve: (_: any, key: string) => {
    _addChangeItemRequestHandler(
      returnItem(univCode, deptCode, _getSelectedStuffName(), props.item.num)
    );
    modalStore.removeModal(key);
  }
};

const statusTagInfo = () => {
  return {
    size: TAG_SIZE,
    color: statusTagColor(props.item),
    content: statusTagContent(props.item)
  };
};

const timestampTagInfo = () => {
  // TODO: 서버 response의 item status를 바꾸고 그 후에 맞춰서 바꾸기
  const TIMESTAMP_TAG_COLOR = "orange";

  return {
    size: TAG_SIZE,
    color: TIMESTAMP_TAG_COLOR,
    content: relativeTimeString(props.item.lastHistory?.approvedAt!)
  };
};

const statusTagColor = (item: ItemInfoOnly) => {
  // TODO: 서버 response의 item status를 바꾸고 그 후에 맞춰서 바꾸기
  if (item.status === "USABLE") return "green";
  if (item.status === "UNUSABLE") return "orange";
  return "red";
};

const statusTagContent = (item: ItemInfoOnly) => {
  // TODO: 서버 response의 item status를 바꾸고 그 후에 맞춰서 바꾸기
  if (item.status === "USABLE") return "대여가능";
  if (item.status === "UNUSABLE") return "대여 중";
  if (item.status === "INACTIVE") return "사용불가";
  return "ERROR";
};

const relativeTimeString = (time: number) => {
  return dayjs.unix(time).fromNow();
};

const _getSelectedStuffName = () => {
  if (selectedStuff.value === loading || selectedStuff.value === undefined) return "";
  return selectedStuff.value.name;
};

const _addChangeItemRequestHandler = (promise: Promise<any>) => {
  promise
    .then(() => {
      stuffStore.turnOnReloadFlag(true);
    })
    .catch((error) => {
      console.error(error);
      if (error.response)
        modalStore.addModal(buildAlertModal("errorAlert", error.response.data.message));
      else modalStore.addModal(_networkErrorAlert);
    });
};

const _networkErrorAlert = buildAlertModal(
  "networkErrorAlert",
  "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
);
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="numbering">{{ item.num }}</span>
      <section class="tags">
        <InfoTag v-bind="statusTagInfo()"></InfoTag>
        <InfoTag v-if="item.status === 'UNUSABLE'" v-bind="timestampTagInfo()"></InfoTag>
      </section>
      <template v-if="viewMode === 'SHOW'">
        <button
          v-if="item.status === 'USABLE'"
          class="btn btn-primary btn-sm"
          @click="modalStore.addModal(rentalRequestModal)"
        >
          대여 신청
        </button>
        <button
          v-else
          class="btn btn-primary btn-sm"
          @click="modalStore.addModal(rentalRequestModal)"
          disabled
        >
          대여 신청
        </button>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <button
            v-if="item.status !== 'INACTIVE'"
            class="btn btn-primary btn-sm"
            @click="modalStore.addModal(lostRequestModal)"
          >
            분실 등록
          </button>
          <button
            v-else
            class="btn btn-primary btn-sm"
            @click="modalStore.addModal(foundApproveModal)"
          >
            반환 확인
          </button>
        </template>
      </template>
      <template v-else>
        <button
          v-if="viewMode === 'ADD' || isNew"
          type="button"
          class="btn btn-danger btn-sm"
          @click="emit('popItem')"
        >
          <i class="bi bi-dash-lg"></i>
        </button>
        <button v-else type="button" class="btn btn-danger btn-sm" disabled>
          <i class="bi bi-dash-lg"></i>
        </button>
      </template>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 4rem;
  $padding-size: map-get($spacers, 3);
  position: relative;

  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 2);
    align-items: center;

    .numbering {
      width: $list-cell-height * 0.7;
      height: $list-cell-height * 0.7;

      line-height: $list-cell-height * 0.7;
      font-size: $h2-font-size;
      font-weight: 700;
      text-align: center;

      background-color: black;
      color: white;
    }

    .tags {
      display: flex;
      flex-direction: row;
      flex-grow: 1;

      align-items: center;
      gap: map-get($spacers, 1);
    }
  }

  .division-line {
    $position-bottom: map-get($spacers, 1);

    width: calc(100% - 2 * $padding-size);

    border-top: 1px solid $gray-200;
    position: absolute;
    bottom: $position-bottom;
  }
}
</style>
