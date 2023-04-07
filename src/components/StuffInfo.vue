<script setup lang="ts">
import type StuffWithItems from "@/models/stuff/StuffWithItems";
import { useStuffStore } from "@/stores/stuffStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const stuffStore = useStuffStore();
const { selectedStuffDetail } = storeToRefs(stuffStore);

const editMode = ref(false);
const changeMode = () => {
  editMode.value = !editMode.value;
};
</script>

<template>
  <section class="stuff-info">
    <section class="icon">{{ (selectedStuffDetail as StuffWithItems).thumbnail }}</section>
    <section class="label-and-desc">
      <section class="label">
        <section class="name">
          <input
            v-if="editMode"
            type="text"
            class="form-control w-100 my-2"
            placeholder="name"
            aria-label="name"
            aria-describedby="basic-addon1"
          />
          <span v-else>
            {{ (selectedStuffDetail as StuffWithItems).name }}
          </span>
        </section>
        <section class="buttons">
          <button class="btn btn-primary btn-sm" @click="changeMode()">수정</button>
          <button class="btn btn-primary btn-sm">추가</button>
        </section>
      </section>
      <div class="desc">
        <textarea
          v-if="editMode"
          class="form-control h-100 fs-7"
          placeholder="Leave a comment here"
          id="floatingTextarea"
        ></textarea>
        <span v-else class="p-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sint corrupti illum
          quos. Dolorum architecto illum, veritatis asperiores odio exercitationem impedit natus.
          Modi magni, aut corporis impedit ullam nemo saepe!
        </span>
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
