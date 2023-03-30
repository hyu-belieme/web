<script setup>
import Tag from "@/components/Tag.vue";
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="name">{{ item.stuffName }} #{{ item.num }}</span>
      <section class="tags">
        <Tag v-bind="userTagInfo"></Tag>
        <Tag v-bind="timestampTagInfo"></Tag>
      </section>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<script>
export default {
  name: "HistoryCell",
  props: [
    "item",
    "num",
    "requester",
    "approveManage",
    "returnManger",
    "lostManager",
    "cancelManager",
    "requestedAt",
    "approvedAt",
    "returnedAt",
    "lostAt",
    "canceledAt"
  ],
  computed: {
    userTagInfo() {
      const tagColor = "green";
      const tagSize = 6;

      var userInfo = this.makeUserTagContent();
      return {
        color: tagColor,
        size: tagSize,
        content: userInfo
      };
    },
    timestampTagInfo() {
      const tagSize = 6;

      var timeInfo = this.makeTimestampTagContent();
      return {
        color: "orange",
        size: tagSize,
        content: timeInfo
      };
    }
  },
  methods: {
    makeUserTagContent() {
      if (this.requester != null) return entranceYearAndNameToString(this.requester);
      if (this.lostManager != null)
        return `${getEnterYear(this.lostManager)} ${this.lostManager.name}`;
      return "ERROR";
    },
    makeTimestampTagContent() {
      if (this.requestedAt != null) {
        return this.$dayjs.unix(this.requestedAt).fromNow();
      }
      if (this.lostAt != null) {
        return this.$dayjs.unix(this.lostAt).fromNow();
      }
      return "ERROR";
    }
  }
};

function entranceYearAndNameToString(user) {
  if (user.entranceYear == null) return user.name;
  return `${user.entranceYear.substr(2, 2)} ${user.name}`;
}

function getEnterYear(user) {
  return user.studentId.substr(2, 2);
}
</script>

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
