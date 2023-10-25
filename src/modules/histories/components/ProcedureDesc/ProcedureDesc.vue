<template>
  <section class="procedure-desc">
    <span class="title">물품 대여 방법</span>
    <section class="desc">
      <span>1. 빌리미 페이지에서 필요한 물품의 대여신청을 한다.</span>
      <span>2. 대여 신청 후 15분 내에 대여 장소로 이동한다.</span>
      <span>3. 대여 장소에서 관리자를 통해 물품을 대여한다.</span>
      <span>4. 사용 후 대여장소에서 관리자를 통해 반납한다.</span>
    </section>
    <section class="rental-space-image">
      <img class="w-100" src="@common/assets/images/map_example.png" />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.procedure-desc {
  width: 100%;

  padding: map-get($map: $spacers, $key: 3);

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

  .rental-space-image {
    width: 100%;
  }
}
</style>
