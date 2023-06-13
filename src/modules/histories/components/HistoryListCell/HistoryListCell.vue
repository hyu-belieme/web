<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getCurrentInstance } from 'vue';

import InfoTag from '@common/components/InfoTag/InfoTag.vue';
import type History from '@common/models/History';
import type User from '@common/models/User';
import useUserModeStore from '@common/stores/user-mode-store';

const TAG_SIZE = 6;

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const userModeStore = useUserModeStore();
const { userMode } = storeToRefs(userModeStore);

const props = defineProps<{
  history: History;
  selected: boolean;
}>();

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

function userTagInfo() {
  const TAG_COLOR = 'green';

  const userInfo = makeUserTagContent(props.history);
  return {
    color: TAG_COLOR,
    size: TAG_SIZE,
    content: userInfo,
  };
}

function timestampTagInfo() {
  const TAG_COLOR = 'orange';

  const timeInfo = makeTimestampTagContent(props.history);
  return {
    color: TAG_COLOR,
    size: TAG_SIZE,
    content: timeInfo,
  };
}
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="name">{{ history.stuff.name }} #{{ history.item.num }}</span>
      <section class="tags">
        <InfoTag
          v-if="userMode === 'STAFF' || userMode === 'MASTER'"
          v-bind="userTagInfo()"
        ></InfoTag>
        <InfoTag v-bind="timestampTagInfo()"></InfoTag>
      </section>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 4rem;
  $padding-size: map-get($spacers, 3);
  position: relative;

  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  &.selected {
    background-color: $gray-200;
  }

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .name {
      line-height: $list-cell-height;
      font-size: $h6-font-size;
      flex-grow: 1;
    }

    .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: map-get($spacers, 1);
    }
  }

  .division-line {
    $position-bottom: -1;

    width: calc(100% - 2 * $padding-size);

    border-bottom: 1px solid $body-bg;
    position: absolute;
    bottom: $position-bottom;
  }
}
</style>
