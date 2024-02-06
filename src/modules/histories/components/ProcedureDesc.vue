<template>
  <section v-if="userMode === 'USER'" class="d-flex flex-column gap-3 p-3">
    <section class="procedure-desc">
      <span class="title">물품 대여 방법</span>
      <section class="desc">
        <span>1. 물품목록 페이지에서 필요한 물품의 대여신청을 한다.</span>
        <span
          >2. 대여 신청 후 15분 내에 대여 장소로 이동한다. 15분이 지나면 대여 신청이 자동으로
          취소된다.</span
        >
        <span>3. 대여 장소에서 관리자를 통해 물품을 대여한다.</span>
        <span>4. 사용 후 대여장소에서 관리자를 통해 반납한다.</span>
      </section>
    </section>
    <section class="rental-space-image">
      <img class="w-100" src="@common/assets/images/map_example.png" />
    </section>
  </section>
  <section v-else-if="userMode === 'STAFF'" class="d-flex flex-column gap-3 p-3">
    <section class="procedure-desc">
      <span class="title">물품 대여 승인 방법</span>
      <section class="desc">
        <span>1. 대여 신청자와 물품을 확인한다.</span>
        <span>2. 물품을 대여해주고 대여기록 페이지에서 신청 기록을 승인한다.</span>
        <span
          >3. 반납 시에는 물품을 확인 후 대여기록 페이지에서 대여 기록을 반납확인 처리한다.</span
        >
      </section>
    </section>
    <section class="procedure-desc">
      <span class="title">물품 분실 시 처리 방법</span>
      <section class="desc">
        <span>1. 물품목록 페이지에서 분실이 발생한 물품을 클릭해 개별 물품 페이지로 이동한다.</span>
        <span>2. 개별물품 페이지에서 분실이 발생한 개별 물품의 분실 기록을 등록한다.</span>
        <span
          >3. 분실된 물품을 다시 찾거나 새로 구매해 다시 사용이 가능해지면 개별 물품 페이지에서 해당
          물품을 반환확인 처리한다.</span
        >
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import type UserMode from '@common/types/UserMode';

defineProps<{
  userMode: UserMode;
}>();
</script>

<style lang="scss" scoped>
.procedure-desc {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: map-get($spacers, 2);

  color: $gray-700;

  .title {
    width: 100%;

    font-weight: $font-weight-semibold;
    line-height: 1;
  }

  .desc {
    width: 100%;

    font-size: $font-size-sm;
    font-weight: $font-weight-normal;

    display: flex;
    flex-direction: column;
  }
}

.rental-space-image {
  width: 100%;
}
</style>
