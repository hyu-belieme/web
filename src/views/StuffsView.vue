<script setup>
import StuffList from "@/components/StuffList.vue";
import DetailStuff from "@/components/DetailStuff.vue";
</script>

<template>
  <section class="stuff-list-page">
    <StuffList></StuffList>
    <DetailStuff></DetailStuff>
  </section>
</template>

<style lang="scss" scoped>
$list-tab-ratio: 16;
$detail-tab-ratio: 25;

.stuff-list-page {
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: map-get($map: $spacers, $key: 4);

  padding-bottom: map-get($map: $spacers, $key: 4);

  .stuff-list {
    max-width: calc(100% * $list-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $list-tab-ratio;

    background-color: $white;
  }

  .stuff-detail {
    max-width: calc(100% * $detail-tab-ratio / ($list-tab-ratio + $detail-tab-ratio));
    height: 100%;
    flex-basis: 0;
    flex-grow: $detail-tab-ratio;

    background-color: $white;
  }
}
</style>
