<script setup lang="ts">
import { List } from 'immutable';
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { onBeforeMount, ref, watchEffect } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { addNewItem } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import ButtonBase from '@common/components/buttons/ButtonBase/ButtonBase.vue';
import PlusIcon from '@common/components/icons/PlusIcon/PlusIcon.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import ConfirmModal from '@common/components/modals/ConfirmModal/ConfirmModal.vue';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import ItemInfoOnly from '@common/models/ItemInfoOnly';
import type StuffWithItems from '@common/models/StuffWithItems';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

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

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const newStuffInfoStore = useNewStuffInfo();

const modalStore = useModalStore();

const queryClient = useQueryClient();

const { data } = getStuffDetailQuery();

const { isStale: isListDataStale } = getStuffListQuery();

const items = ref<List<ItemInfoOnly>>(List<ItemInfoOnly>([]));

const addNewItemMutation = useMutation<StuffWithItems, BaseError>(
  () => addNewItem(userToken.value, selectedId.value),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
    },
    onError: (error) => {
      console.error(error);
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const addItemModal = {
  component: ConfirmModal,
  props: {
    title: '물품 추가하기',
    content: '물품 정보와 다르게 추가는 즉시 적용됩니다. 물품을 해당 물품을 추가하시겠습니까?',
    resolveLabel: '추가하기',
    rejectLabel: '뒤로가기',
  },
  resolve: () => {
    addNewItemMutation.mutate();
    modalStore.removeModal();
  },
  reject: () => {
    modalStore.removeModal();
  },
};

function addNewItemOnList() {
  if (items.value.size >= MAX_ITEM_NUM) return items.value;
  return items.value.push(
    new ItemInfoOnly({
      id: NIL_UUID,
      num: items.value.size + 1,
      status: 'USABLE',
      lastHistory: null,
    })
  );
}

function pushNewItem() {
  if (viewMode.value === 'ADD' || viewMode.value === 'INITIAL_ADD') {
    newStuffInfoStore.increaseNewAmount();
    items.value = addNewItemOnList();
  } else if (viewMode.value === 'EDIT') {
    modalStore.addModal(addItemModal);
  }
}

function popItem() {
  if (viewMode.value === 'ADD' || viewMode.value === 'INITIAL_ADD')
    newStuffInfoStore.decreaseNewAmount();
  items.value = items.value.pop();
}

onBeforeMount(() => {
  watchEffect(() => {
    if (viewMode.value === 'ADD' || viewMode.value === 'INITIAL_ADD')
      items.value = List<ItemInfoOnly>([]);
    else if (data.value === undefined) items.value = List<ItemInfoOnly>([]);
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
    <ButtonBase
      v-if="viewMode === 'EDIT' || viewMode === 'ADD' || viewMode === 'INITIAL_ADD'"
      type="button"
      class="w-100"
      v-bind:color="'gray'"
      @click="pushNewItem()"
    >
      <PlusIcon :color="'dark'"></PlusIcon>
    </ButtonBase>
  </section>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 2);
}
</style>
