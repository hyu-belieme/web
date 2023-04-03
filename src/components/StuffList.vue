<script setup>
import StuffCell from "@/components/StuffCell.vue";
</script>

<template>
  <section class="stuff-list">
    <StuffCell
      v-for="(stuff, index) in stuffs"
      :key="stuff"
      v-bind="{ stuff: stuff, selected: index == selected }"
      @click="setSelected(index)"
    ></StuffCell>
  </section>
</template>

<script>
import stuffDummies from "@/assets/dummies/stuffs.js";

export default {
  name: "StuffList",
  data() {
    return {
      stuffs: stuffDummies,
      selected: 0
    };
  },
  methods: {
    setSelected(selected) {
      this.selected = selected;
      this.$emit("selectedStuff", this.stuffs[selected]);
    }
  },
  created: function () {
    this.setSelected(0);
  }
};
</script>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
