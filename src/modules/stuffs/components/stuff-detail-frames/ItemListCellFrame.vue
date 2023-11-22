<script setup lang="ts">
import { getCurrentInstance } from 'vue';

import type ItemInfoOnly from '@common/models/ItemInfoOnly';

defineProps<{
  item: ItemInfoOnly;
}>();

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

function textByStatus(item: ItemInfoOnly) {
  if (item.status === 'USABLE') return '대여 가능';
  if (item.status === 'REQUESTED') return '예약 됨';
  if (item.status === 'USING') return '대여 중';
  if (item.status === 'LOST') return '사용 불가';
  return 'ERROR';
}

function relativeTimeString(time: number) {
  return dayjs.unix(time).fromNow();
}

function timestampByStatus(item: ItemInfoOnly) {
  if (item.status === 'REQUESTED') {
    return relativeTimeString(item.lastHistory?.requestedAt!);
  }
  if (item.status === 'USING') {
    return relativeTimeString(item.lastHistory?.approvedAt!);
  }
  if (item.status === 'LOST') {
    return relativeTimeString(item.lastHistory?.lostAt!);
  }
  return 'ERROR';
}
</script>

<template>
  <section class="cell">
    <section class="numbering">
      <slot name="numbering">
        <section class="w-100 h-100 position-relative">
          <span class="position-absolute start-50 top-50 translate-middle fs-xl fw-bold">
            {{ item.num }}
          </span>
        </section>
      </slot>
    </section>
    <section class="content">
      <section class="info">
        <slot name="info">
          <section
            :class="[
              'd-flex',
              'flex-row',
              'align-items-center',
              'gap-1',
              'px-2',
              item.status !== 'USABLE' ? 'danger-color' : '',
            ]"
          >
            <span>{{ textByStatus(item) }}</span>
            <span v-if="item.status !== 'USABLE'" class="fw-normal fs-sm">
              ({{ timestampByStatus(item) }})
            </span>
          </section>
        </slot>
      </section>
      <slot name="buttons"></slot>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  position: relative;

  padding-left: map-get($spacers, 2);
  padding-right: map-get($spacers, 2);

  padding-top: map-get($spacers, 1);
  padding-bottom: map-get($spacers, 1);

  background-color: $white;
  border: $border-width solid $border-color;
  @include border-radius();

  display: flex;
  flex-direction: row;
  align-items: center;

  .numbering {
    width: 2rem;
    height: 2rem;
  }

  .content {
    width: 100%;
    height: 100%;

    padding-left: map-get($spacers, 1);
    padding-right: map-get($spacers, 1);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: map-get($spacers, 2);

    .info {
      flex-grow: 1;
    }
  }
}

.danger-color {
  color: $danger;
  font-weight: $font-weight-semibold;
}
</style>
