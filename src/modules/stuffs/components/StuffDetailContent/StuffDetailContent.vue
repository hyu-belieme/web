<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

import { editStuff, postNewStuff } from "@common/apis/beliemeApis";
import { build as buildAlertModal } from "@common/components/AlertModal/utils/alertModalBuilder";
import { useModalStore } from "@common/stores/modalStore";
import { useUserStore } from "@common/stores/userStore";
import type { StuffWithItems } from "@common/types/Models";

import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

const stuffStore = useStuffStore();
const { selectedStuffDetail, newStuffAmount } = storeToRefs(stuffStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const modalStore = useModalStore();

const thumbnailInput = ref<string>();
const nameInput = ref<string>();
const descInput = ref<string>();

watch(viewMode, () => {
  thumbnailInput.value =
    viewMode.value === "EDIT" ? (selectedStuffDetail.value as StuffWithItems).thumbnail : "";

  nameInput.value =
    viewMode.value === "EDIT" ? (selectedStuffDetail.value as StuffWithItems).name : "";

  descInput.value = viewMode.value === "EDIT" ? LOREM_IPSUM : "";
});

const commitChange = () => {
  editStuff(univCode, deptCode, (selectedStuffDetail.value as StuffWithItems).name, {
    name: nameInput.value ? nameInput.value : "",
    thumbnail: thumbnailInput.value ? thumbnailInput.value : ""
  })
    .then(() => stuffStore.turnOnReloadFlag(true))
    .catch((error) => {
      console.error(error);
      if (error.response)
        modalStore.addModal(buildAlertModal("errorAlert", error.response.data.message));
      else modalStore.addModal(_networkErrorAlert);
    });
};

const commitAddNewStuff = () => {
  postNewStuff(univCode, deptCode, {
    name: nameInput.value ? nameInput.value : "",
    thumbnail: thumbnailInput.value ? thumbnailInput.value : "",
    amount: newStuffAmount.value
  })
    .then(() => stuffStore.turnOnReloadFlag())
    .catch((error) => {
      console.error(error);
      if (error.response)
        modalStore.addModal(buildAlertModal("errorAlert", error.response.data.message));
      else modalStore.addModal(_networkErrorAlert);
    });
};

const univCode = "HYU";
const deptCode = "CSE";
const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus. Modi magni, aut corporis impedit ullam nemo saepe!";

const _networkErrorAlert = buildAlertModal(
  "networkErrorAlert",
  "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
);
</script>

<template>
  <section class="stuff-info">
    <section class="thumbnail">
      <span v-if="viewMode === 'SHOW'">
        {{ (selectedStuffDetail as StuffWithItems).thumbnail }}
      </span>
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
          <span v-if="viewMode === 'SHOW'">
            {{ (selectedStuffDetail as StuffWithItems).name }}
          </span>
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
                    if (viewMode === 'EDIT') commitChange();
                    else if (viewMode === 'ADD') commitAddNewStuff();
                    viewModeStore.changeStuffDetailViewMode('SHOW');
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
                    stuffStore.turnOnReloadFlag(true);
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
