<script setup lang="ts">
import stuffDummies from "@/assets/dummies/stuffs";
import StuffCell from "@/components/StuffCell.vue";
import { loading } from "@/models/Types";
import type Stuff from "@/models/stuff/Stuff";
import { useStuffStore } from "@/stores/stuffStore";
import { storeToRefs } from "pinia";

const stuffStore = useStuffStore();
const { stuffs, selected } = storeToRefs(stuffStore);

updateSelected(0);
updateStuffs();

// ====== functions ======

function updateSelected(newVal: number) {
  stuffStore.updateSelected(newVal);
}

function updateStuffs() {
  stuffStore.updateStuffs({
    load: () => {
      // return undefined;
      // return loading;
      return stuffDummies;
    }
  });
}
</script>

<template>
  <section class="stuff-list">
    <template v-if="stuffs === loading">
      <span class="w-100 text-center">로딩 중</span>
    </template>
    <template v-else-if="stuffs === undefined">
      <span class="w-100 text-center">
        데이터를 불러오는데 문제가 발생하였습니다.<br />
        새로고침 후에 다시 이용해 주세요.
      </span>
    </template>
    <template v-else>
      <StuffCell
        v-for="(stuff, index) in (stuffs as Stuff[])"
        :key="stuff.name"
        v-bind="{ stuff: stuff, selected: index == selected }"
        @click="updateSelected(index)"
      ></StuffCell>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
