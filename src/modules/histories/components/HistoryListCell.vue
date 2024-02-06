<script setup lang="ts">
import { getCurrentInstance } from 'vue';

import type History from '@common/models/History';
import type User from '@common/models/User';
import type UserMode from '@common/types/UserMode';

defineProps<{
  userMode: UserMode;
  history: History;
  selected: boolean;
}>();

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

function entranceYearAndNameToString(user: User) {
  if (user.entranceYear === undefined) return user.name;
  return `${user.entranceYear % 100} ${user.name}`;
}

function makeUserTagContent(history: History) {
  if (history.requester !== undefined) return entranceYearAndNameToString(history.requester);
  if (history.lostManager !== undefined) return entranceYearAndNameToString(history.lostManager);
  return 'ERROR';
}

function makeTimestampTagContent(history: History) {
  if (history.requestedAt !== undefined) {
    return dayjs.unix(history.requestedAt).fromNow();
  }
  if (history.lostAt !== undefined) {
    return dayjs.unix(history.lostAt).fromNow();
  }
  return 'ERROR';
}
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="name">{{ history.stuff.name }} #{{ history.item.num }}</span>
      <section class="sub-info">
        <section class="tags">
          <span v-if="history.status === 'DELAYED'" class="delayed">연체됨</span>
        </section>
        <section class="user-and-timestamp">
          <span v-if="userMode === 'STAFF'">
            {{ makeUserTagContent(history) }}
          </span>
          <span>{{ makeTimestampTagContent(history) }}</span>
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-up('tablet-landscape') {
  .selected {
    background-color: $gray-100;

    .content {
      border-bottom: calc($border-width * 0.5) solid transparent;
    }
  }
}

.cell {
  $padding-size: map-get($spacers, 2);
  position: relative;

  padding-left: $padding-size;
  padding-right: $padding-size;

  &:hover {
    background-color: $gray-100;

    .content {
      border-bottom: calc($border-width * 0.5) solid transparent;
    }
  }

  &:last-child {
    .content {
      border-bottom: calc($border-width * 0.5) solid transparent;
    }
  }

  .content {
    width: 100%;
    height: auto;

    padding-top: map-get($spacers, 3);
    padding-bottom: map-get($spacers, 3);
    padding-left: map-get($spacers, 1);
    padding-right: map-get($spacers, 1);

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    border-bottom: calc($border-width * 0.5) solid $border-color;

    .name {
      font-size: $font-size-base;
      flex-grow: 0;
    }

    .sub-info {
      width: 0;
      flex-grow: 1;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      font-size: $font-size-sm;

      .tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: map-get($spacers, 1);

        .delayed {
          color: $danger;
        }
      }

      .user-and-timestamp {
        width: fit-content;
        color: $gray-700;

        span::after {
          content: ' · ';
        }

        span:last-child {
          &::after {
            content: '';
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: map-get($spacers, 1);
    }
  }
}
</style>
