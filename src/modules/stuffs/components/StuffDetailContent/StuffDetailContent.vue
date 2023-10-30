<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { editStuff, postNewStuff } from '@common/apis/belieme-apis';
import { stuffKeys } from '@common/apis/query-keys';
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import buildAlertModal from '@common/components/modals/AlertModal/utils/alert-modal-builder';
import useModalStore from '@common/components/modals/stores/modal-store';
import type BaseError from '@common/errors/BaseError';
import type StuffWithItems from '@common/models/StuffWithItems';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';
import useUserModeStore from '@common/stores/user-mode-store';

import {
  getStuffDetailQuery,
  getStuffListQuery,
  reloadStuffDataUsingCacheAndResponse,
} from '@^stuffs/components/utils/stuff-query-utils';
import useNewStuffInfo from '@^stuffs/stores/new-stuff-info-store';
import useStuffDetailViewModeStore from '@^stuffs/stores/stuff-detail-view-mode-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus. Modi magni, aut corporis impedit ullam nemo saepe!';

const userTokenStorage = useUserTokenStorage();
const { userToken } = storeToRefs(userTokenStorage);

const curDeptStorage = useCurDeptStorage();
const { curDeptId } = storeToRefs(curDeptStorage);

const modalStore = useModalStore();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const newStuffInfoStore = useNewStuffInfo();
const { newName, newThumbnail, newDesc, newAmount } = storeToRefs(newStuffInfoStore);

const nameInput = ref<string>(newName.value);
const thumbnailInput = ref<string>(newThumbnail.value);
const descInput = ref<string>(newDesc.value);

const { data } = getStuffDetailQuery();

const { isStale: isListDataStale } = getStuffListQuery();

const queryClient = useQueryClient();

const commitChangeMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    editStuff(userToken.value, selectedId.value, {
      name: newName.value,
      thumbnail: newThumbnail.value,
    }),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
      viewModeStore.changeStuffDetailViewMode('SHOW');
    },
    onError: (error) => {
      console.error(error);
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

const commitAddNewStuffMutation = useMutation<StuffWithItems, BaseError>(
  () =>
    postNewStuff(userToken.value, {
      departmentId: curDeptId.value,
      name: newName.value,
      thumbnail: newThumbnail.value,
      amount: newAmount.value,
    }),
  {
    onSuccess: (response) => {
      reloadStuffDataUsingCacheAndResponse(queryClient, response, isListDataStale.value);
      viewModeStore.changeStuffDetailViewMode('SHOW');
    },
    onError: (error) => {
      console.error(error);
      queryClient.invalidateQueries(stuffKeys.list(curDeptId.value));
      queryClient.invalidateQueries(stuffKeys.detail(selectedId.value));
      modalStore.addModal(buildAlertModal('errorAlert', error.message));
    },
  }
);

function initInputValue() {
  if (data.value === undefined) {
    nameInput.value = '';
    thumbnailInput.value = '';
    descInput.value = '';
    return;
  }
  nameInput.value = viewMode.value === 'EDIT' ? data.value.name : '';
  thumbnailInput.value = viewMode.value === 'EDIT' ? data.value.thumbnail : '';
  descInput.value = viewMode.value === 'EDIT' ? LOREM_IPSUM : '';
}

onBeforeMount(() => {
  watch(nameInput, () => newStuffInfoStore.updateNewName(nameInput.value));
  watch(thumbnailInput, () => newStuffInfoStore.updateNewThumbnail(thumbnailInput.value));
  watch(descInput, () => newStuffInfoStore.updateNewDesc(descInput.value));

  watch(viewMode, () => {
    initInputValue();
  });
});
</script>

<template>
  <section class="stuff-info">
    <section class="thumbnail">
      <span
        v-if="viewMode === 'SHOW'"
        class="position-absolute top-50 start-50 translate-middle lh-1"
        >{{ data?.thumbnail }}</span
      >
      <input
        v-else
        v-model="thumbnailInput"
        type="text"
        class="form-control edit-box position-absolute top-50 start-50 translate-middle lh-1"
        aria-label="thumbnail"
      />
    </section>
    <section class="label-and-desc">
      <section v-if="viewMode === 'SHOW'" class="label">
        <section class="name fs-xl fw-semibold">
          <span>{{ data?.name }}</span>
        </section>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <section class="buttons">
            <BasicButton
              v-bind="{
                size: 'sm',
                content: '수정',
              }"
              @click="viewModeStore.changeStuffDetailViewMode('EDIT')"
            ></BasicButton>
            <BasicButton
              v-bind="{
                size: 'sm',
                content: '추가',
              }"
              @click="viewModeStore.changeStuffDetailViewMode('ADD')"
            ></BasicButton>
          </section>
        </template>
      </section>
      <section v-else class="label">
        <section class="name h-100 d-flex fs-base fw-semibold">
          <input
            v-model="nameInput"
            type="text"
            class="form-control edit-box"
            placeholder="물품 이름을 입력해주세요."
            aria-label="name"
            aria-describedby="basic-addon1"
          />
        </section>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <section class="buttons">
            <BasicButton
              v-bind="{
                size: 'sm',
                content: '저장',
              }"
              @click="
                () => {
                  if (viewMode === 'EDIT') commitChangeMutation.mutate();
                  else if (viewMode === 'ADD' || viewMode === 'INITIAL_ADD')
                    commitAddNewStuffMutation.mutate();
                }
              "
            ></BasicButton>
            <BasicButton
              v-bind="{
                size: 'sm',
                color: 'light',
                content: '뒤로',
              }"
              @click="
                () => {
                  viewModeStore.changeStuffDetailViewMode('SHOW');
                }
              "
            ></BasicButton>
          </section>
        </template>
      </section>
      <div class="desc fs-xs fw-light">
        <span v-if="viewMode === 'SHOW'" class="p-1">
          {{ LOREM_IPSUM }}
        </span>
        <textarea
          v-else
          v-model="descInput"
          class="form-control edit-box h-100"
          placeholder="물품 설명을 입력해주세요."
          id="floatingTextarea"
        ></textarea>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.stuff-info {
  display: flex;
  flex-direction: row;

  gap: map-get($map: $spacers, $key: 2);

  .thumbnail {
    width: 10rem;
    height: 10rem;
    position: relative;
    font-size: 8rem;

    .edit-box {
      width: 100%;
      height: 100%;

      border: $border-width solid $border-color;
      @include border-radius();

      &:focus {
        border: $border-width solid $primary;
        outline: none;
      }
      background-color: $white;
      font-size: inherit;
      font-weight: inherit;

      text-align: center;
    }
  }

  .label-and-desc {
    flex-basis: 0;
    flex-grow: 1;

    height: 100%;

    display: flex;
    flex-direction: column;
    gap: map-get($map: $spacers, $key: 2);

    .label {
      display: flex;
      flex-direction: row;
      align-items: center;

      gap: map-get($map: $spacers, $key: 2);

      .name {
        width: 0;
        flex-grow: 1;
        flex-basis: 0;

        .edit-box {
          width: 100%;

          border: $border-width solid $border-color;
          @include border-radius();

          padding-top: map-get($spacers, 1);
          padding-bottom: map-get($spacers, 1);

          padding-left: map-get($spacers, 2);
          padding-right: map-get($spacers, 2);
          font-size: inherit;
          font-weight: inherit;

          &:focus {
            border: $border-width solid $primary;
            outline: none;
          }

          background-color: $white;
        }
      }

      .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: map-get($map: $spacers, $key: 2);

        button {
          min-width: 3rem;
        }
      }
    }

    .desc {
      flex-basis: 0;
      flex-grow: 1;

      overflow: scroll;

      .edit-box {
        width: 100%;
        height: 100%;

        border: $border-width solid $border-color;
        @include border-radius();

        padding: map-get($spacers, 2);
        font-size: inherit;
        font-weight: inherit;

        &:focus {
          border: $border-width solid $primary;
          outline: none;
        }

        background-color: $white;
      }
    }
  }
}
</style>
