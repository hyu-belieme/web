<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import Modal from "@/components/Modal.vue";
import type ItemNestedToStuff from "@/models/item/ItemNestedToStuff";
import { useModalStore } from "@/stores/modalStore";
import { useModeStore } from "@/stores/modeStore";
import { storeToRefs } from "pinia";
import { computed, getCurrentInstance } from "vue";

const app = getCurrentInstance();
const dayjs = app?.appContext.config.globalProperties.$dayjs;

const modeStore = useModeStore();
const { detailStuffMode } = storeToRefs(modeStore);

const props = defineProps<{
  item: ItemNestedToStuff;
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

function showModal() {
  modalStore.addModal({
    key: "rentalRequest",
    component: Modal,
    props: {
      title: "대여 요청 보내기",
      content:
        "요청을 한 후에 대여장소에서 관리자를 통해 대여 승인을 받고 대여 할 수 있습니다. 단, 해당 요청은 15분 후에 자동으로 만료됩니다.",
      resolveLabel: "보내기"
    },
    resolve: () => {
      console.log("보내기");
      console.log(props.item);
      modalStore.removeModal("rentalRequest");
    },
    reject: () => {
      modalStore.removeModal("rentalRequest");
    }
  });
}

function makeStatusTagColor(item: ItemNestedToStuff) {
  if (item.status == "USABLE") return "green";
  if (item.status == "UNUSABLE") return "orange";
  return "red";
}

function makeStatusTagContent(item: ItemNestedToStuff) {
  if (item.status == "USABLE") return "대여가능";
  if (item.status == "UNUSABLE") return "대여 중";
  if (item.status == "INACTIVE") return "사용불가";
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
        <Tag v-bind="statusTagInfo"></Tag>
        <Tag v-if="item.status == 'UNUSABLE'" v-bind="timestampTagInfo"></Tag>
      </section>
      <template v-if="detailStuffMode == 'SHOW'">
        <button v-if="item.status === 'USABLE'" class="btn btn-primary btn-sm" @click="showModal()">
          대여하기
        </button>
        <button v-else class="btn btn-primary btn-sm" @click="showModal()" disabled>
          대여하기
        </button>
      </template>
      <template v-else>
        <button
          v-if="detailStuffMode == 'ADD' || isNew"
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
