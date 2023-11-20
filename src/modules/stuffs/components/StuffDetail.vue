<script setup lang="ts">
import { computed, toRef } from 'vue';

import Department from '@common/models/Department';
import Item from '@common/models/Item';
import StuffInfoOnly from '@common/models/StuffInfoOnly';
import type StuffWithItems from '@common/models/StuffWithItems';
import University from '@common/models/University';

import StuffDetailItemList from '@^stuffs/components/ItemList.vue';
import StuffDetailContent from '@^stuffs/components/StuffInfo.vue';
import StuffDetailFrame from '@^stuffs/components/stuff-detail-frames/StuffDetailFrame.vue';

const props = defineProps<{
  stuff: StuffWithItems | undefined;
}>();

const stuff = toRef(props, 'stuff');

const emits = defineEmits<{
  (e: 'toEditMode'): void;
  (e: 'toRegisterMode'): void;
}>();

const items = computed(() =>
  stuff.value?.items.map(
    (e) =>
      new Item({
        ...e,
        university: props.stuff?.university ?? University.NIL,
        department: props.stuff?.department ?? Department.NIL,
        stuff: props.stuff ?? StuffInfoOnly.NIL,
      })
  )
);
</script>

<template>
  <section class="w-100 h-100">
    <StuffDetailFrame>
      <template v-slot:stuff-info>
        <StuffDetailContent
          :stuff="stuff"
          @to-edit-mode="emits('toEditMode')"
          @to-register-mode="emits('toRegisterMode')"
        ></StuffDetailContent>
      </template>
      <template v-slot:item-list>
        <StuffDetailItemList :items="items?.toArray() ?? []"></StuffDetailItemList>
      </template>
    </StuffDetailFrame>
  </section>
</template>

<style lang="scss" scoped></style>
