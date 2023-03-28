<script setup>
import StuffInfo from "@/components/StuffInfo.vue";
import ItemList from "@/components/ItemList.vue";
</script>

<template>
  <section class="stuff-detail">
    <StuffInfo></StuffInfo>
    <ItemList></ItemList>
  </section>
</template>

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
