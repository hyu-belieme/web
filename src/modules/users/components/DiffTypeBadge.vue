<template>
  <div
    :class="[
      'diff-type-badge',
      state === 'modified' ? 'bg-primary' : state === 'added' ? 'bg-success' : 'bg-danger',
    ]"
  >
    <span>{{ state === 'modified' ? 'M' : state === 'added' ? 'A' : 'D' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  state: 'modified' | 'added' | 'deleted';
}>();
</script>

<style scoped lang="scss">
.diff-type-badge {
  width: 1.25rem;
  height: 1.25rem;
  @include border-radius(0.2rem);
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    line-height: 1;
    font-size: $font-size-sm;
    color: $white;
  }
}
</style>
