<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import type User from "@/models/user/User";
import type History from "@/models/history/History";
import { computed, getCurrentInstance } from "vue";

const props = defineProps<{
  history: History;
  selected: boolean;
}>();

const app = getCurrentInstance();
const dayjs = app?.appContext.config.globalProperties.$dayjs;

const userTagInfo = computed(() => {
  const tagColor = "green";
  const tagSize = 6;

  var userInfo = makeUserTagContent(props.history);
  return {
    color: tagColor,
    size: tagSize,
    content: userInfo
  };
});
const timestampTagInfo = computed(() => {
  const tagSize = 6;

  var timeInfo = makeTimestampTagContent(props.history);
  return {
    color: "orange",
    size: tagSize,
    content: timeInfo
  };
});

const entranceYearAndNameToString = (user: User) => {
  if (user.entranceYear == null) return user.name;
  return `${user.entranceYear % 100} ${user.name}`;
};
const makeUserTagContent = (history: History) => {
  if (history.requester != null) return entranceYearAndNameToString(history.requester);
  if (history.lostManager != null) return entranceYearAndNameToString(history.lostManager);
  return "ERROR";
};
const makeTimestampTagContent = (history: History) => {
  if (history.requestedAt != null) {
    return dayjs.unix(history.requestedAt).fromNow();
  }
  if (history.lostAt != null) {
    return dayjs.unix(history.lostAt).fromNow();
  }
  return "ERROR";
};
</script>

<template>
  <section :class="[selected ? 'cell selected' : 'cell']">
    <section class="content">
      <span class="name">{{ history.item.stuff.name }} #{{ history.item.num }}</span>
      <section class="tags">
        <Tag v-bind="userTagInfo"></Tag>
        <Tag v-bind="timestampTagInfo"></Tag>
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
