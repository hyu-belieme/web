<script setup>
import StuffCell from "@/components/StuffCell.vue";
</script>

<template>
  <section class="stuff-list">
    <StuffCell></StuffCell>
    <StuffCell></StuffCell>
    <StuffCell></StuffCell>
    <StuffCell></StuffCell>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
