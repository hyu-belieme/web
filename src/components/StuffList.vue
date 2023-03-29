<script setup>
import StuffCell from "@/components/StuffCell.vue";
</script>

<template>
  <section class="stuff-list">
    <StuffCell
      v-for="stuff in stuffs"
      :key="stuff"
      v-bind="{ name: stuff.name, thumbnail: stuff.thumbnail, count: stuff.count }"
    ></StuffCell>
  </section>
</template>

<script>
import stuffDummies from "@/assets/dummies/stuffs.js";

export default {
  name: "StuffList",
  data() {
    return {
      stuffs: stuffDummies
    };
  }
};
</script>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
