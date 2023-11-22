<script setup lang="ts">
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

import UserDiffListContent from '@^users/components/UserDiffListContent.vue';

withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    title?: string;
    contentForDesktop?: string;
    contentForMobile?: string;
    size?: string;
  }>(),
  {
    title: '',
    content: '',
    size: '',
  }
);
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey" v-bind:size="size">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">{{ title }}</span>
    </template>
    <template v-slot:body>
      <section class="on-mobile">
        <section class="d-flex flex-column gap-1">
          <section class="user-diff-list-frame">
            <UserDiffListContent></UserDiffListContent>
          </section>
          <p class="no-margin-p">{{ contentForMobile }}</p>
        </section>
      </section>
      <section class="on-desktop">
        <p class="no-margin-p fw-light">{{ contentForDesktop }}</p>
      </section>
    </template>
    <template v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton color="primary" content="등록하기" @click="() => $emit('resolve')">
        </BasicButton>
        <BasicButton color="light" content="뒤로가기" @click="$emit('reject')"></BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}

.user-diff-list-frame {
  border: $border-width solid $border-color;
  @include border-radius();

  height: 20rem;
  overflow: scroll;

  background-color: $gray-50;
}

@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .on-desktop {
    display: none;
  }

  .on-mobile {
    display: block;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .on-desktop {
    display: block;
  }

  .on-mobile {
    display: none;
  }
}
</style>
