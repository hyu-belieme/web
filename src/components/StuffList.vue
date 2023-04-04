<script setup>
import StuffCell from "@/components/StuffCell.vue";
import stuffDummies from "@/assets/dummies/stuffs.js";
import { storeToRefs } from "pinia";
import { useStuffStore } from "@/stores/stuff";

const stuffStore = useStuffStore();
const { stuffs, selected } = storeToRefs(stuffStore);

function updateSelected(newVal) {
  stuffStore.updateSelected(newVal);
}

function updateStuffs() {
  stuffStore.updateStuffs({
    load: () => {
      return stuffDummies;
    }
  });
}

updateSelected(0);
updateStuffs();
</script>

<template>
  <section class="stuff-list">
    <StuffCell
      v-for="(stuff, index) in stuffs"
      :key="stuff"
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
