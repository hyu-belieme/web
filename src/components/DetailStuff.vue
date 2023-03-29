<script setup>
import StuffInfo from "@/components/StuffInfo.vue";
import ItemList from "@/components/ItemList.vue";
</script>

<template>
  <section class="stuff-detail">
    <StuffInfo v-bind="{ name: stuff.name, thumbnail: stuff.thumbnail }"></StuffInfo>
    <ItemList v-bind="{ items: stuff.items }"></ItemList>
  </section>
</template>

<script>
export default {
  name: "DetailStuff",
  data() {
    return {
      stuff: {
        name: "블루투스 스피커",
        thumbnail: "📻",
        amount: 6,
        count: 5,
        items: [
          {
            num: 1,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 2,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 3,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 4,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 5,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 6,
            status: "USABLE",
            lastHistory: null
          }
        ]
      }
    };
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
