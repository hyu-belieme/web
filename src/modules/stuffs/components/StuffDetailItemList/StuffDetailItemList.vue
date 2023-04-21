<script setup lang="ts">
import { List } from "immutable";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watchEffect } from "vue";

import { addNewItem } from "@common/apis/beliemeApis";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import BasicModal from "@common/components/BasicModal/BasicModal.vue";
import { useModalStore } from "@common/stores/modalStore";
import { type Loading, loading } from "@common/types/Loading";
import type { ItemInfoOnly } from "@common/types/Models";

import ItemListCell from "@^stuffs/components/StuffDetailItemListCell/StuffDetailItemListCell.vue";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

onBeforeMount(() => {
  watchEffect(() => {
    if (viewMode.value === "SHOW") {
      items.value = selectedStuffItems.value;
    } else if (viewMode.value === "ADD") {
      items.value = List();
    }
  });
});

const MAX_ITEM_NUM = 50;

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const stuffStore = useStuffStore();
const { selectedStuff, selectedStuffItems } = storeToRefs(stuffStore);

const modalStore = useModalStore();

const items = ref<Loading | List<ItemInfoOnly> | undefined>(undefined);

const selectedStuffItemsSize = () => {
  if (selectedStuffItems.value === loading || selectedStuffItems.value === undefined) {
    return 0;
  }
  return selectedStuffItems.value.size;
};

const pushNewItem = () => {
  if (viewMode.value === "ADD") {
    stuffStore.increaseNewStuffAmount();
    items.value = _addNewItemOnList();
  } else if (viewMode.value === "EDIT") {
    modalStore.addModal(addItemModal);
  }
};

const popItem = () => {
  if (items.value === loading || items.value === undefined) return;
  if (viewMode.value === "ADD") stuffStore.decreaseNewStuffAmount();
  items.value = items.value.pop();
};

const addItemModal = {
  key: "addItem",
  component: BasicModal,
  props: {
    title: "물품 추가하기",
    content: "물품 정보와 다르게 추가는 즉시 적용됩니다. 물품을 해당 물품을 추가하시겠습니까?",
    resolveLabel: "추가하기"
  },
  resolve: (_: any, key: string) => {
    const { univCode, deptCode, stuffName } = _getSelectedStuffIndex();
    modalStore.removeModal(key);
    _addChangeItemRequestHandler(addNewItem(univCode, deptCode, stuffName));
  }
};

const _addChangeItemRequestHandler = (promise: Promise<any>) => {
  promise
    .then(() => {
      items.value = _addNewItemOnList();
    })
    .catch((error) => {
      console.error(error);
      if (error.response)
        modalStore.addModal(buildAlertModal("errorAlert", error.response.data.message));
      else modalStore.addModal(_networkErrorAlert);
    });
};

const _addNewItemOnList = () => {
  if (items.value === loading) return loading;
  if (items.value === undefined) return undefined;
  if (items.value.size >= MAX_ITEM_NUM) return items.value;
  return items.value.push({
    num: items.value.size + 1,
    status: "USABLE",
    lastHistory: null
  });
};

const _getSelectedStuffIndex = () => {
  if (selectedStuff.value === loading || selectedStuff.value === undefined) {
    return {
      univCode: "",
      deptCode: "",
      stuffName: ""
    };
  }
  return {
    univCode: "HYU",
    deptCode: "CSE",
    stuffName: selectedStuff.value.name
  };
};

const _networkErrorAlert = buildAlertModal(
  "networkErrorAlert",
  "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
);
</script>

<template>
  <section class="item-list">
    <template v-if="items !== loading && items !== undefined">
      <ItemListCell
        v-for="(item, index) of items"
        :key="index"
        v-bind="{ item: item, isNew: index >= selectedStuffItemsSize() }"
        @pop-item="popItem"
      ></ItemListCell>
      <button
        v-if="viewMode === 'EDIT' || viewMode === 'ADD'"
        type="button"
        class="btn btn-outline-primary btn mx-3"
        @click="pushNewItem()"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;

  .cell {
    $list-cell-height: 4rem;
    $padding-size: map-get($spacers, 3);
    position: relative;

    height: $list-cell-height;
    padding-left: $padding-size;
    padding-right: $padding-size;
  }
}
</style>
