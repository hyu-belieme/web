<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";
import type { StuffWithItems } from "@common/types/Models";

import { useStuffDetailViewModeStore } from "@^stuffs/stores/stuffDetailViewModeStore";
import { useStuffStore } from "@^stuffs/stores/stuffStore";

const stuffStore = useStuffStore();
const { selectedStuffDetail } = storeToRefs(stuffStore);

const viewModeStore = useStuffDetailViewModeStore();
const viewMode = storeToRefs(viewModeStore).stuffDetailViewMode;

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);
</script>

<template>
  <section class="stuff-info">
    <section class="thumbnail">
      <span v-if="viewMode === 'SHOW'">
        {{ (selectedStuffDetail as StuffWithItems).thumbnail }}
      </span>
      <input
        v-else
        type="text"
        class="form-control edit-box"
        :value="viewMode === 'EDIT' ? (selectedStuffDetail as StuffWithItems).thumbnail : ''"
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
            type="text"
            class="form-control w-100 my-2"
            placeholder="물품 이름을 입력해주세요."
            :value="viewMode === 'EDIT' ? (selectedStuffDetail as StuffWithItems).name : ''"
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
                @click="viewModeStore.changeStuffDetailViewMode('SHOW')"
              >
                저장
              </button>
              <button
                class="btn btn-second btn-sm"
                @click="viewModeStore.changeStuffDetailViewMode('SHOW')"
              >
                취소
              </button>
            </template>
          </section>
        </template>
      </section>
      <div class="desc">
        <span v-if="viewMode === 'SHOW'" class="p-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum
          quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus.
          Modi magni, aut corporis impedit ullam nemo saepe!
        </span>
        <textarea
          v-else
          class="form-control h-100 fs-7"
          placeholder="물품 설명을 입력해주세요."
          :value="viewMode === 'EDIT' ? 'Lorem ~~' : ''"
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
