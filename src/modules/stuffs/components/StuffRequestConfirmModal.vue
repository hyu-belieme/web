<script setup lang="ts">
import BasicButton from '@common/components/buttons/BasicButton/BasicButton.vue';
import BasicModal from '@common/components/modals/BasicModal/BasicModal.vue';

withDefaults(
  defineProps<{
    modalKey: string;
    index: number;
    size?: string;
    resolveLabel?: string;
    rejectLabel?: string;
    hasCloseButton?: boolean;
  }>(),
  {
    size: '',
    resolveLabel: '',
    rejectLabel: '',
    hasCloseButton: false,
  }
);
</script>

<template>
  <BasicModal v-bind:index="index" v-bind:modalKey="modalKey" v-bind:size="size">
    <template v-slot:header>
      <span class="modal-title fs-lg fw-semibold">물품 대여 방법</span>
    </template>
    <template v-slot:body>
      <section class="d-flex flex-column gap-3 p-1">
        <section class="desc">
          <span>1. 물품목록 페이지에서 필요한 물품의 대여신청을 한다.</span>
          <span
            >2. 대여 신청 후 15분 내에 대여 장소로 이동한다. 15분이 지나면 대여 신청이 자동으로
            취소된다.</span
          >
          <span>3. 대여 장소에서 관리자를 통해 물품을 대여한다.</span>
          <span>4. 사용 후 대여장소에서 관리자를 통해 반납한다.</span>
        </section>
        <section class="rental-space-image">
          <img class="w-100" src="@common/assets/images/map_example.png" />
        </section>
      </section>
    </template>
    <template v-if="rejectLabel !== '' || resolveLabel !== ''" v-slot:footer>
      <div class="d-flex flex-gap-2">
        <BasicButton
          v-if="resolveLabel !== ''"
          color="primary"
          :content="resolveLabel"
          @click="$emit('resolve')"
        >
        </BasicButton>
        <BasicButton
          v-if="rejectLabel !== ''"
          color="light"
          :content="rejectLabel"
          @click="$emit('reject')"
        >
          {{ rejectLabel }}
        </BasicButton>
      </div>
    </template>
  </BasicModal>
</template>

<style scoped lang="scss">
.no-margin-p {
  margin: 0;
}

.desc {
  width: 100%;

  font-size: $font-size-sm;
  font-weight: $font-weight-normal;

  display: flex;
  flex-direction: column;

  gap: map-get($spacers, 1);
}

.rental-space-image {
  width: 100%;
}
</style>
