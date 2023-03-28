<script setup>
import InfoList from "@/components/InfoList.vue";
</script>

<template>
  <section class="history-info">
    <section class="label">
      <section class="icon">📻</section>
      <section class="name">블루투스 스피커 #2</section>
    </section>
    <InfoList></InfoList>
    <InfoList></InfoList>
    <section class="buttons">
      <button class="btn btn-primary btn-sm">승인하기</button>
      <button class="btn btn-danger btn-sm">취소하기</button>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.history-info {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);

  .label {
    $label-height: 4rem;

    width: 100%;
    height: $label-height;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .icon {
      line-height: $label-height;
      font-size: $h1-font-size;
    }

    .name {
      line-height: $label-height;
      font-size: $h3-font-size;
      flex-grow: 1;
    }
  }

  .info-list {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: map-get($map: $spacers, $key: 2);
  }
}
</style>
