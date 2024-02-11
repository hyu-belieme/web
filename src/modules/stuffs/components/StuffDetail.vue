<script setup lang="ts">
import { computed, toRef } from 'vue';

import DataLoadFailView from '@common/components/DataLoadFailView/DataLoadFailView.vue';
import LoadingView from '@common/components/LoadingView/LoadingView.vue';
import Item from '@common/models/Item';
import type StuffWithItems from '@common/models/StuffWithItems';
import type UserMode from '@common/types/UserMode';

import StuffDetailItemList from '@^stuffs/components/ItemList.vue';
import StuffDetailContent from '@^stuffs/components/StuffInfo.vue';
import StuffDetailFrame from '@^stuffs/components/stuff-detail-frames/StuffDetailFrame.vue';

const props = defineProps<{
  userMode: UserMode;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  stuff: StuffWithItems;
}>();

const isSuccess = toRef(props, 'isSuccess');
const isLoading = toRef(props, 'isLoading');
const isError = toRef(props, 'isError');
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
        university: props.stuff.university,
        department: props.stuff.department,
        stuff: props.stuff,
      })
  )
);
</script>

<template>
  <section class="w-100 h-100">
    <LoadingView v-if="isLoading"></LoadingView>
    <DataLoadFailView v-else-if="isError"></DataLoadFailView>
    <StuffDetailFrame v-else-if="isSuccess">
      <template v-slot:stuff-info>
        <StuffDetailContent
          :user-mode="userMode"
          :stuff="stuff"
          @to-edit-mode="emits('toEditMode')"
          @to-register-mode="emits('toRegisterMode')"
        ></StuffDetailContent>
      </template>
      <template v-slot:item-list>
        <StuffDetailItemList
          :user-mode="userMode"
          :items="items?.toArray() ?? []"
        ></StuffDetailItemList>
      </template>
    </StuffDetailFrame>
  </section>
</template>

<style lang="scss" scoped></style>
