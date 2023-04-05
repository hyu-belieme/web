<script setup lang="ts">
import stuffDummies from "@/assets/dummies/stuffs";
import StuffCell from "@/components/StuffCell.vue";
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
      return stuffDummies;
    }
  });
}
</script>

<template>
  <section class="stuff-list">
    <StuffCell
      v-for="(stuff, index) in stuffs"
      :key="index"
      v-bind="{ stuff: stuff, selected: index == selected }"
      @click="updateSelected(index)"
    ></StuffCell>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
