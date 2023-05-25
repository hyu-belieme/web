<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { editStuff, postNewStuff } from "@common/apis/beliemeApis";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import { useDeptStore } from "@common/stores/deptStore";
import { useModalStore } from "@common/stores/modalStore";
import { useUserStore } from "@common/stores/userStore";
import type { BeliemeError, StuffWithItems } from "@common/types/Models";

import {
  getStuffDetailQuery,
  getStuffListQuery,
  invalidateStuffDetailQuery,
  invalidateStuffDetailQueryAfterCacheCheck,
  invalidateStuffListQuery,
  setStuffDetailQueryCacheData,
  setStuffListQueryData
} from "@^stuffs/queries/stuffQueries";
import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

onBeforeMount(() => {
  watch(viewMode, () => {
    _initInputVale();
  });
});

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus. Modi magni, aut corporis impedit ullam nemo saepe!";

const modalStore = useModalStore();

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffStore();
const { selectedId, newStuffAmount } = storeToRefs(stuffStore);

const { data } = getStuffDetailQuery();

const { data: listData } = getStuffListQuery();

const queryClient = useQueryClient();

const thumbnailInput = ref<string>("");
const nameInput = ref<string>("");
const descInput = ref<string>("");

const commitChangeMutation = useMutation<StuffWithItems, BeliemeError>(
  () =>
    editStuff(selectedId.value, {
      name: nameInput.value,
      thumbnail: thumbnailInput.value
    }),
  {
    onSuccess: (response) => {
      if (listData.value !== undefined) {
        setStuffDetailQueryCacheData(response);

        let newStuffList = listData.value.filter((e) => e.id !== response.id);
        newStuffList = newStuffList.push(response);
        setStuffListQueryData(queryClient, newStuffList, response.id);
        invalidateStuffDetailQueryAfterCacheCheck(queryClient);
      }
      viewModeStore.changeStuffDetailViewMode("SHOW");
    },
    onError: (error) => {
      console.error(error);
      invalidateStuffListQuery(queryClient);
      invalidateStuffDetailQuery(queryClient);
      modalStore.addModal(buildAlertModal("errorAlert", error.message));
    }
  }
);

const commitAddNewStuffMutation = useMutation<StuffWithItems, BeliemeError>(
  () =>
    postNewStuff({
      departmentId: deptId.value,
      name: nameInput.value,
      thumbnail: thumbnailInput.value,
      amount: newStuffAmount.value
    }),
  {
    onSuccess: (response) => {
      if (listData.value !== undefined) {
        setStuffDetailQueryCacheData(response);

        let newStuffList = listData.value.filter((e) => e.id !== response.id);
        newStuffList = newStuffList.push(response);
        setStuffListQueryData(queryClient, newStuffList, response.id);
        invalidateStuffDetailQueryAfterCacheCheck(queryClient);
      }

      viewModeStore.changeStuffDetailViewMode("SHOW");
    },
    onError: (error) => {
      console.error(error);
      invalidateStuffListQuery(queryClient);
      invalidateStuffDetailQuery(queryClient);
      modalStore.addModal(buildAlertModal("errorAlert", error.message));
    }
  }
);

const _initInputVale = () => {
  if (data.value === undefined) {
    thumbnailInput.value = "";
    nameInput.value = "";
    descInput.value = "";
    return;
  }
  thumbnailInput.value = viewMode.value === "EDIT" ? data.value.thumbnail : "";
  nameInput.value = viewMode.value === "EDIT" ? data.value.name : "";
  descInput.value = viewMode.value === "EDIT" ? LOREM_IPSUM : "";
};
</script>

<template>
  <section class="stuff-info">
    <section class="thumbnail">
      <span v-if="viewMode === 'SHOW'">{{ data?.thumbnail }}</span>
      <input
        v-else
        v-model="thumbnailInput"
        type="text"
        class="form-control edit-box"
        aria-label="thumbnail"
      />
    </section>
    <section class="label-and-desc">
      <section class="label">
        <section class="name">
          <span v-if="viewMode === 'SHOW'">{{ data?.name }}</span>
          <input
            v-else
            v-model="nameInput"
            type="text"
            class="form-control w-100 my-2"
            placeholder="물품 이름을 입력해주세요."
            aria-label="name"
            aria-describedby="basic-addon1"
          />
        </section>
        <template v-if="userMode === 'STAFF' || userMode === 'MASTER'">
          <section class="buttons">
            <template v-if="viewMode === 'SHOW'">
              <button
                class="btn btn-primary btn-sm"
                @click="viewModeStore.changeStuffDetailViewMode('EDIT')"
              >
                수정
              </button>
              <button
                class="btn btn-primary btn-sm"
                @click="viewModeStore.changeStuffDetailViewMode('ADD')"
              >
                추가
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-primary btn-sm"
                @click="
                  () => {
                    if (viewMode === 'EDIT') commitChangeMutation.mutate();
                    else if (viewMode === 'ADD') commitAddNewStuffMutation.mutate();
                  }
                "
              >
                저장
              </button>
              <button
                class="btn btn-second btn-sm"
                @click="
                  () => {
                    viewModeStore.changeStuffDetailViewMode('SHOW');
                  }
                "
              >
                뒤로
              </button>
            </template>
          </section>
        </template>
      </section>
      <div class="desc">
        <span v-if="viewMode === 'SHOW'" class="p-1">
          {{ LOREM_IPSUM }}
        </span>
        <textarea
          v-else
          v-model="descInput"
          class="form-control h-100 fs-7"
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
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    font-size: 10rem;
    text-align: center;

    .edit-box {
      width: 100%;
      height: calc(100% - map-get($map: $spacers, $key: 2));

      margin-top: map-get($map: $spacers, $key: 2);

      font-size: 9rem;
      text-align: center;
    }
  }

  .label-and-desc {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    .label {
      height: 54px;
      display: flex;
      flex-direction: row;
      align-items: center;

      font-size: $h3-font-size;
      gap: map-get($map: $spacers, $key: 2);

      .name {
        width: 0;
        flex-grow: 1;
        flex-basis: 0;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        gap: map-get($map: $spacers, $key: 2);

        button {
          min-width: 3rem;
        }
      }
    }

    .desc {
      flex-basis: 0;
      flex-grow: 1;

      font-size: 0.75rem;
      font-weight: 300;

      overflow: scroll;
    }
  }
}
</style>
