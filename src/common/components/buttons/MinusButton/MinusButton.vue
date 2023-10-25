<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean;
    multiplier?: number;
    onClick?: () => void;
  }>(),
  {
    disabled: false,
    multiplier: 1,
    onClick: () => {},
  }
);
</script>

<template>
  <svg
    :class="['total', disabled ? 'disabled' : '']"
    :width="16 * multiplier"
    :height="16 * multiplier"
    :viewBox="`0 0 ${16 * multiplier} ${16 * multiplier}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="onClick()"
  >
    <rect
      class="circle"
      :x="0.5 * multiplier"
      :y="0.5 * multiplier"
      :width="15 * multiplier"
      :height="15 * multiplier"
      :rx="7.5 * multiplier"
      fill="#E14D2A"
    />
    <rect
      class="minus"
      :x="4 * multiplier"
      :y="7.25 * multiplier"
      :width="8 * multiplier"
      :height="1.5 * multiplier"
      fill="white"
    />
  </svg>
</template>

<style lang="scss" scoped>
.total {
  .circle {
    fill: $danger;
  }

  .minus {
    fill: $white;
  }

  &:hover {
    .circle {
      fill: shade-color($danger, 10%);
    }
  }

  &.disabled {
    .circle {
      fill: tint-color($danger, 40%);
    }
  }
}
</style>
