<script setup>
import StuffCell from "@/components/StuffCell.vue";
</script>

<template>
  <section class="stuff-list">
    <StuffCell v-bind="{ name: '블루투스 스피커', thumbnail: '📻', count: 5 }"></StuffCell>
    <StuffCell v-bind="{ name: '우산', thumbnail: '🌂', count: 2 }"></StuffCell>
    <StuffCell v-bind="{ name: '축구공', thumbnail: '⚽️', count: 3 }"></StuffCell>
    <StuffCell v-bind="{ name: '농구공', thumbnail: '🏀', count: 0 }"></StuffCell>
  </section>
</template>

<style lang="scss" scoped>
.stuff-list {
  display: flex;
  flex-direction: column;
}
</style>
