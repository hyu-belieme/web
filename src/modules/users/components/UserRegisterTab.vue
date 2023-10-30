<template>
  <section class="user-diff-list">
    <section class="w-100">
      <section class="border-bottom d-flex flex-row align-items-center px-2">
        <section
          class="px-1 py-2 w-0 flex-grow-1 d-flex flex-row align-items-center justify-content-between"
        >
          <span class="lh-sm">등록하기</span>
        </section>
      </section>
    </section>
    <section class="w-100 d-flex flex-column py-2 gap-2">
      <section class="w-100 px-2">
        <section class="w-100 d-flex flex-row px-1 gap-2 align-items-center">
          <span class="">학번</span>
          <input
            type="text"
            class="form-control edit-box flex-grow-1"
            placeholder="학번을 입력해주세요."
          />
        </section>
      </section>
      <section class="w-100 px-2">
        <section class="w-100 d-flex flex-row px-1 gap-2 align-items-center">
          <span class="">권한</span>
          <BasicSelector
            class="authority-selector flex-grow-1"
            size=""
            :disabled="false"
            :options="
              Map({
                banned: {
                  label: 'banned',
                  value: 'banned',
                },
                user: {
                  label: 'user',
                  value: 'user',
                },
                staff: {
                  label: 'staff',
                  value: 'staff',
                },
                master: {
                  label: 'master',
                  value: 'master',
                },
              })
            "
            initial-key="user"
          ></BasicSelector>
        </section>
      </section>
    </section>
    <section class="w-100 px-2 pb-2 d-flex flex-row gap-2 justify-content-center">
      <BasicButton content="등록하기" size="sm"></BasicButton>
      <BasicButton content="취소하기" color="light" size="sm"></BasicButton>
    </section>
  </section>
</template>

<script setup lang="ts">
import { Map } from 'immutable';

import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicSelector from '@common/components/selectors/BasicSelector/BasicSelector.vue';
</script>

<style scoped lang="scss">
.user-diff-list {
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: $white;

  border: $border-width solid $border-color;
  @include border-radius();
}

.edit-box {
  border: $border-width solid $border-color;
  @include border-radius();

  padding-top: map-get($spacers, 1);
  padding-bottom: map-get($spacers, 1);

  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);
  font-size: inherit;
  font-weight: inherit;

  &:focus {
    border: $border-width solid $primary;
    outline: none;
  }

  background-color: $white;
}
</style>
