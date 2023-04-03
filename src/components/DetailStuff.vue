<script setup>
import StuffInfo from "@/components/StuffInfo.vue";
import ItemList from "@/components/ItemList.vue";
</script>

<template>
  <section class="stuff-detail">
    <section v-if="loaded">
      <StuffInfo v-bind="{ stuff: stuffDetail }"></StuffInfo>
      <ItemList v-bind="{ items: stuffDetail.itemList }"></ItemList>
    </section>
  </section>
</template>

<script>
import stuffDummies from "@/assets/dummies/stuffs.js";

export default {
  props: ["stuff"],
  name: "DetailStuff",
  data() {
    return {
      loaded: false,
      stuffDetail: {}
    };
  },
  methods: {
    setDetailStuff() {
      this.stuffDetail = stuffDummies.find((e) => e.name == this.stuff.name);
    }
  },
  watch: {
    stuff() {
      this.setDetailStuff();
    }
  },
  created: function () {
    this.setDetailStuff();
    this.loaded = true;
  }
};
</script>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;

  padding: map-get($map: $spacers, $key: 4);
  gap: map-get($map: $spacers, $key: 4);

  .stuff-info {
    flex-grow: 0;
  }

  .item-list {
    flex-grow: 1;
  }
}
</style>
