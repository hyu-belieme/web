<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";

import InfoTag from "@common/components/InfoTag/InfoTag.vue";
import { useUserStore } from "@common/stores/newUserStore";
import type { History, User } from "@common/types/NewModels";

const TAG_SIZE = 6;

const app = getCurrentInstance();
const dayjs = app!.appContext.config.globalProperties.$dayjs;

const userStore = useUserStore();
const { userMode } = storeToRefs(userStore);

const props = defineProps<{
  history: History;
  selected: boolean;
}>();

const userTagInfo = () => {
  const TAG_COLOR = "green";

  var userInfo = _makeUserTagContent(props.history);
  return {
    color: TAG_COLOR,
    size: TAG_SIZE,
    content: userInfo
  };
};

const timestampTagInfo = () => {
  const TAG_COLOR = "orange";

  var timeInfo = _makeTimestampTagContent(props.history);
  return {
    color: TAG_COLOR,
    size: TAG_SIZE,
    content: timeInfo
  };
};

const _makeUserTagContent = (history: History) => {
  if (history.requester !== undefined) return _entranceYearAndNameToString(history.requester);
  if (history.lostManager !== undefined) return _entranceYearAndNameToString(history.lostManager);
  return "ERROR";
};

const _makeTimestampTagContent = (history: History) => {
  if (history.requestedAt !== undefined) {
    return dayjs.unix(history.requestedAt).fromNow();
  }
  if (history.lostAt !== undefined) {
    return dayjs.unix(history.lostAt).fromNow();
  }
  return "ERROR";
};

const _entranceYearAndNameToString = (user: User) => {
  if (user.entranceYear === undefined) return user.name;
  return `${user.entranceYear % 100} ${user.name}`;
};
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="name">{{ history.item.stuff.name }} #{{ history.item.num }}</span>
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
