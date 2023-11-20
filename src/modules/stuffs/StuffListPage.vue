<script setup lang="ts">
import CommonStuffPageOnDesktop from '@^stuffs/components/CommonStuffPageOnDesktop.vue';
import StuffList from '@^stuffs/components/StuffList/StuffList.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';

const { isSuccess, data } = getStuffListQuery();
</script>

<template>
  <section class="desktop-frame">
    <StuffPageOnEmpty v-if="isSuccess && data?.size === 0"></StuffPageOnEmpty>
    <CommonStuffPageOnDesktop v-else></CommonStuffPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <StuffPageOnEmpty v-if="isSuccess && data?.size === 0"></StuffPageOnEmpty>
    <StuffList v-else></StuffList>
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
  .desktop-frame {
    display: block;

    width: 100%;
    height: 100%;
  }

  .mobile-frame {
    display: none;
  }
}
</style>
