<script setup lang="ts">
import type { StuffWithItems } from "@common/types/Models";
import { useStuffStore } from "@modules/stuffs/stores/stuffStore";
import { useModeStore } from "@common/stores/modeStore";
import { storeToRefs } from "pinia";

const stuffStore = useStuffStore();
const { selectedStuffDetail } = storeToRefs(stuffStore);

const modeStore = useModeStore();
const { detailStuffMode, userMode } = storeToRefs(modeStore);
</script>

<template>
  <section class="stuff-info">
    <section class="icon">{{ (selectedStuffDetail as StuffWithItems).thumbnail }}</section>
    <section class="label-and-desc">
      <section class="label">
        <section class="name">
          <span v-if="detailStuffMode == 'SHOW'">
            {{ (selectedStuffDetail as StuffWithItems).name }}
          </span>
          <input
            v-else
            type="text"
            class="form-control w-100 my-2"
            placeholder="물품 이름을 입력해주세요."
            :value=" detailStuffMode == 'EDIT' ? (selectedStuffDetail as StuffWithItems).name : ''"
            aria-label="name"
            aria-describedby="basic-addon1"
          />
        </section>
        <template v-if="userMode == 'STAFF' || userMode == 'MASTER'">
          <section class="buttons">
            <template v-if="detailStuffMode == 'SHOW'">
              <button
                class="btn btn-primary btn-sm"
                @click="modeStore.changeDetailStuffMode('EDIT')"
              >
                수정
              </button>
              <button
                class="btn btn-primary btn-sm"
                @click="modeStore.changeDetailStuffMode('ADD')"
              >
                추가
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-primary btn-sm"
                @click="modeStore.changeDetailStuffMode('SHOW')"
              >
                저장
              </button>
              <button
                class="btn btn-second btn-sm"
                @click="modeStore.changeDetailStuffMode('SHOW')"
              >
                취소
              </button>
            </template>
          </section>
        </template>
      </section>
      <div class="desc">
        <span v-if="detailStuffMode == 'SHOW'" class="p-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum
          quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus.
          Modi magni, aut corporis impedit ullam nemo saepe!
        </span>
        <textarea
          v-else
          class="form-control h-100 fs-7"
          placeholder="물품 설명을 입력해주세요."
          :value="detailStuffMode == 'EDIT' ? 'Lorem ~~' : ''"
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

  .icon {
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    font-size: 10rem;
    text-align: center;
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
