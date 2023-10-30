<template>
  <CheckboxBase
    :name="name"
    :value="value"
    :disabled="disabled"
    :customDisabled="true"
    :initState="initState"
  >
    <template v-slot:on-unchecked>
      <section class="frame"></section>
    </template>
    <template v-slot:on-checked>
      <section class="frame bg-primary border-0">
        <CheckIcon
          class="position-absolute start-50 top-50 translate-middle"
          size="auto"
          hover="off"
          color="white"
        ></CheckIcon>
      </section>
    </template>
    <template v-slot:on-indeterminate>
      <section class="frame bg-primary border-0">
        <MinusIcon
          class="on-indeterminate position-absolute start-50 top-50 translate-middle"
          size="auto"
          hover="off"
          color="white"
        ></MinusIcon>
      </section>
    </template>

    <template v-slot:on-unchecked-disabled>
      <section class="frame-unchecked-disabled"></section>
    </template>
    <template v-slot:on-checked-disabled>
      <section class="frame bg-primary border-0 bg-opacity-75">
        <CheckIcon
          class="position-absolute start-50 top-50 translate-middle"
          size="auto"
          hover="off"
          color="white"
        ></CheckIcon>
      </section>
    </template>
    <template v-slot:on-indeterminate-disabled>
      <section class="frame bg-primary border-0 bg-opacity-75">
        <MinusIcon
          class="on-indeterminate position-absolute start-50 top-50 translate-middle"
          size="auto"
          hover="off"
          color="white"
        ></MinusIcon>
      </section>
    </template>
  </CheckboxBase>
</template>

<script setup lang="ts">
import CheckboxBase from '@common/components/checkboxes/CheckboxBase/CheckboxBase.vue';
import CheckIcon from '@common/components/icons/CheckIcon/CheckIcon.vue';
import MinusIcon from '@common/components/icons/MinusIcon/MinusIcon.vue';

withDefaults(
  defineProps<{
    name: string;
    value?: string;
    disabled?: boolean;
    initState?: 'checked' | 'unchecked' | 'indeterminate';
  }>(),
  {
    value: 'on',
    disabled: false,
    initState: 'unchecked',
  }
);
</script>

<style scoped lang="scss">
.frame {
  width: 100%;
  height: 100%;
  padding: 2px;

  position: relative;

  background-color: $white;
  border: 0.125rem solid $gray;
  @include border-radius(0.2rem);

  &:hover {
    border: 0.125rem solid hover-color($gray);
  }
}

.frame-unchecked-disabled {
  width: 100%;
  height: 100%;

  position: relative;

  background-color: $gray-50;
  border: 0.125rem solid $gray;
  @include border-radius(0.2rem);

  filter: opacity(50%);
}
</style>
