<script setup lang="ts">
import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { addNewItem } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import buildAlertModal from '@common/components/AlertModal/utils/alert-modal-builder';
import BasicModal from '@common/components/BasicModal/BasicModal.vue';
import type BaseError from '@common/errors/BaseError';
import type ItemInfoOnly from '@common/models/ItemInfoOnly';
import type StuffWithItems from '@common/models/StuffWithItems';
import useModalStore from '@common/stores/modal-store';
import useDeptStore from '@common/stores/new-dept-store';

import ItemListCell from '@^stuffs/components/StuffDetailItemListCell/StuffDetailItemListCell.vue';
import {
  getStuffDetailQuery,
  getStuffListQuery,
  reloadStuffDataUsingCacheAndResponse,
} from '@^stuffs/components/utils/stuff-query-utils';
import useNewStuffInfo from '@^stuffs/stores/new-stuff-info-store';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const MAX_ITEM_NUM = 50;

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const deptStore = useDeptStore();
const deptId = computed(() => storeToRefs(deptStore).deptId.value || '');

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const newStuffInfoStore = useNewStuffInfo();

const modalStore = useModalStore();

const queryClient = useQueryClient();

const { data } = getStuffDetailQuery();

const { isStale: isListDataStale } = getStuffListQuery();

const items = ref<List<ItemInfoOnly>>(List([]));

const addNewItemMutation = useMutation<StuffWithItems, BaseError>(
  () => addNewItem(selectedId.value),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
    },
    onError: (error) => {
      console.error(error);
      queryClient.invalidateQueries(stuffKeys.list(deptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const addItemModal = {
  key: 'addItem',
  component: BasicModal,
  props: {
    title: '물품 추가하기',
    content: '물품 정보와 다르게 추가는 즉시 적용됩니다. 물품을 해당 물품을 추가하시겠습니까?',
    resolveLabel: '추가하기',
  },
  resolve: (_: any, key: string) => {
    modalStore.removeModal(key);
    addNewItemMutation.mutate();
  },
};

function addNewItemOnList() {
  if (items.value.size >= MAX_ITEM_NUM) return items.value;
  return items.value.push({
    id: NIL_UUID,
    num: items.value.size + 1,
    status: 'USABLE',
    lastHistory: null,
  });
}

function pushNewItem() {
  if (viewMode.value === 'ADD') {
    newStuffInfoStore.increaseNewAmount();
    items.value = addNewItemOnList();
  } else if (viewMode.value === 'EDIT') {
    modalStore.addModal(addItemModal);
  }
}

function popItem() {
  if (viewMode.value === 'ADD') newStuffInfoStore.decreaseNewAmount();
  items.value = items.value.pop();
}

onBeforeMount(() => {
  watchEffect(() => {
    if (viewMode.value === 'ADD') items.value = List();
    else if (data.value === undefined) items.value = List();
    else items.value = data.value.items;
  });
});
</script>

<template>
  <section class="item-list">
    <ItemListCell
      v-for="(item, index) of items"
      :key="index"
      v-bind="{ item: item }"
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
