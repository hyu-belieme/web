<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIL as NIL_UUID } from 'uuid';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import CommonStuffPageOnDesktop from '@^stuffs/components/CommonStuffPageOnDesktop.vue';
import StuffDetailTab from '@^stuffs/components/StuffDetailTab.vue';
import StuffListTab from '@^stuffs/components/StuffListTab.vue';
import StuffPageOnEmpty from '@^stuffs/components/StuffPageOnEmpty.vue';
import { getStuffListQuery } from '@^stuffs/components/utils/stuff-query-utils';
import useStuffSelectedStore from '@^stuffs/stores/stuff-selected-store';

const route = useRoute();

const stuffSelectedStore = useStuffSelectedStore();
const { selectedId } = storeToRefs(stuffSelectedStore);

const { isSuccess, data } = getStuffListQuery();

const stuffIdOnRoute = computed(() => {
  if (typeof route.query.stuffId === 'string') {
    return route.query.stuffId;
  }
  if (Array.isArray(route.query.stuffId)) {
    return route.query.stuffId.join('');
  }
  return NIL_UUID;
});

function doesStuffExist(currentId: string) {
  if (data.value === undefined || data.value.isEmpty()) return false;
  return data.value.some((value) => value.id === currentId);
}

watch(
  stuffIdOnRoute,
  () => {
    stuffSelectedStore.updateSelectedId(stuffIdOnRoute.value);
  },
  { immediate: true }
);
</script>

<template>
  <section class="desktop-frame">
    <StuffPageOnEmpty v-if="isSuccess && data?.size === 0"></StuffPageOnEmpty>
    <CommonStuffPageOnDesktop v-else></CommonStuffPageOnDesktop>
  </section>
  <section class="mobile-frame">
    <StuffPageOnEmpty v-if="isSuccess && data?.size === 0"></StuffPageOnEmpty>
    <StuffListTab v-else-if="!doesStuffExist(stuffIdOnRoute)"></StuffListTab>
    <StuffDetailTab v-else :key="selectedId"></StuffDetailTab>
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
