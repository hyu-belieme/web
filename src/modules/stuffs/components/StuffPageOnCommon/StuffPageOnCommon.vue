<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import StuffDetail from '@^stuffs/components/StuffDetailSection/StuffDetailSection.vue';
import StuffList from '@^stuffs/components/StuffList/StuffList.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useMobileCurrentStuffPage from '@^stuffs/stores/mobile-current-stuff-page-store';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const stuffStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffStore);

const mobileCurrentStuffPageStore = useMobileCurrentStuffPage();
const { mobileCurrentStuffPage } = storeToRefs(mobileCurrentStuffPageStore);

const { isLoading, isSuccess, isFetching } = getStuffListQuery();

const dataLoadStatus = computed(() => {
  if (isFetching.value || isLoading.value) return 'Loading';
  if (isSuccess.value) return 'Success';
  return 'Error';
});
</script>

<template>
  <section class="desktop-frame">
    <section class="list-section">
      <StuffList></StuffList>
    </section>
    <section class="detail-section">
      <StuffDetail :inherit-status="dataLoadStatus" :key="selectedId"></StuffDetail>
    </section>
  </section>
  <section class="mobile-frame">
    <StuffList v-if="mobileCurrentStuffPage === 'LIST'"></StuffList>
    <StuffDetail
      v-else-if="mobileCurrentStuffPage === 'DETAIL'"
      :inherit-status="dataLoadStatus"
      :key="selectedId"
    ></StuffDetail>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-between('mobile', 'tablet-landscape') {
  .desktop-frame {
    display: none;
  }

  .mobile-frame {
    display: block;

    width: 100%;
    height: 100%;
  }
}

@include media-breakpoint-up('tablet-landscape') {
  .mobile-frame {
    display: none;
  }

  .desktop-frame {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($map: $spacers, $key: 3);

    .list-section {
      width: 24rem;
      height: 100%;
    }

    .detail-section {
      width: 0;
      height: 100%;

      flex-grow: 1;
    }
  }
}
</style>
