<script setup lang="ts">
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import InfoTag from "@common/components/InfoTag/InfoTag.vue";
import { useModalStore } from "@common/stores/modalStore";
import { useUserModeStore } from "@common/stores/userModeStore";
import type { ItemInfoOnly } from "@common/types/Models";

import { useDetailStuffViewModeStore } from "@^stuffs/stores/DetailStuffViewModeStore";

import { storeToRefs } from "pinia";
import { computed, getCurrentInstance } from "vue";

const app = getCurrentInstance();
const dayjs = app?.appContext.config.globalProperties.$dayjs;

const viewModeStore = useDetailStuffViewModeStore();
const viewMode = storeToRefs(viewModeStore).detailStuffViewMode;

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const props = defineProps<{
  item: ItemInfoOnly;
  isNew: boolean;
}>();

const emit = defineEmits(["popItem"]);

const statusTagInfo = computed(() => {
  const tagSize = 6;

  return {
    size: tagSize,
    color: makeStatusTagColor(props.item),
    content: makeStatusTagContent(props.item)
  };
});

const timestampTagInfo = computed(() => {
  const tagSize = 6;
  const tagColor = "orange";

  return {
    size: tagSize,
    color: tagColor,
    content: getRelativeTimeString(props.item.lastHistory?.approvedAt!)
  };
});

const modalStore = useModalStore();

function showRentalRequestModal() {
  modalStore.addModal({
    key: "rentalRequest",
    component: BasicModal,
    props: {
      title: "대여 신청하기",
      content:
        "신청을 한 후에 대여장소에서 관리자를 통해 대여 승인을 받고 대여 할 수 있습니다. 단, 해당 신청은 15분 후에 자동으로 만료됩니다.",
      resolveLabel: "신청하기"
    },
    resolve: () => {
      console.log("대여 신청");
      console.log(props.item);
      modalStore.removeModal("rentalRequest");
    },
    reject: () => {
      modalStore.removeModal("rentalRequest");
    }
  });
}

function showLostRequestModal() {
  modalStore.addModal({
    key: "LostRequest",
    component: BasicModal,
    props: {
      title: "분실 등록하기",
      content:
        "해당 물품을 분실하셨나요? 분실 등록 시 해당 물품은 사용 불가능 한 상태가 됩니다. 물품을 되찾게 된다면 반환 처리를 할 수 있지만 분실 기록은 남게 됩니다.",
      resolveLabel: "등록하기"
    },
    resolve: () => {
      console.log("분실 등록");
      console.log(props.item);
      modalStore.removeModal("LostRequest");
    },
    reject: () => {
      modalStore.removeModal("LostRequest");
    }
  });
}

function showFoundApproveModal() {
  modalStore.addModal({
    key: "FoundApprove",
    component: BasicModal,
    props: {
      title: "반환 확인하기",
      content:
        "분실한 물품을 찾으셨나요? 반환 확인 시 해당 묾품이 다시 사용가능해 집니다. 다시 물품을 분실된 상태로 만들 수 있지만 그렇게 할 시 새로운 기록은 남게 됩니다.",
      resolveLabel: "확인하기"
    },
    resolve: () => {
      console.log("반환 확인");
      console.log(props.item);
      modalStore.removeModal("FoundApprove");
    },
    reject: () => {
      modalStore.removeModal("FoundApprove");
    }
  });
}

function makeStatusTagColor(item: ItemInfoOnly) {
  if (item.status === "USABLE") return "green";
  if (item.status === "UNUSABLE") return "orange";
  return "red";
}

function makeStatusTagContent(item: ItemInfoOnly) {
  if (item.status === "USABLE") return "대여가능";
  if (item.status === "UNUSABLE") return "대여 중";
  if (item.status === "INACTIVE") return "사용불가";
  return "ERROR";
}

function getRelativeTimeString(time: number) {
  return dayjs?.unix(time).fromNow();
}
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="numbering">{{ item.num }}</span>
      <section class="tags">
        <InfoTag v-bind="statusTagInfo"></InfoTag>
        <InfoTag v-if="item.status === 'UNUSABLE'" v-bind="timestampTagInfo"></InfoTag>
      </section>
      <template v-if="viewMode === 'SHOW'">
        <button
          v-if="item.status === 'USABLE'"
          class="btn btn-primary btn-sm"
          @click="showRentalRequestModal()"
        >
          대여 신청
        </button>
        <button v-else class="btn btn-primary btn-sm" @click="showRentalRequestModal()" disabled>
          대여 신청
        </button>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <button
            v-if="item.status !== 'INACTIVE'"
            class="btn btn-primary btn-sm"
            @click="showLostRequestModal()"
          >
            분실 등록
          </button>
          <button v-else class="btn btn-primary btn-sm" @click="showFoundApproveModal()">
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
