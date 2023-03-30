<script setup>
import Tag from "@/components/Tag.vue";
</script>

<template>
  <section class="cell">
    <section class="content">
      <span class="numbering">{{ item.num }}</span>
      <section class="tags">
        <Tag v-bind="statusTagInfo"></Tag>
        <Tag v-if="item.status == 'UNUSABLE'" v-bind="tiemstampTagInfo"></Tag>
      </section>
      <section class="buttons">
        <button v-if="item.status === 'USABLE'" class="btn btn-primary btn-sm">대여하기</button>
        <button v-else class="btn btn-primary btn-sm" disabled>대여하기</button>
      </section>
    </section>
    <div class="division-line"></div>
  </section>
</template>

<script>
export default {
  name: "ItemCell",
  props: ["item"],
  computed: {
    statusTagInfo() {
      const tagSize = 6;

      return {
        size: tagSize,
        color: this.makeStatusTagColor(this.item),
        content: this.makeStatusTagContent(this.item)
      };
    },
    tiemstampTagInfo() {
      const tagSize = 6;
      const tagColor = "orange";

      return {
        size: tagSize,
        color: tagColor,
        content: this.getRelativeTimeString(this.item.lastHistory.approvedAt)
      };
    }
  },
  methods: {
    getRelativeTimeString(time) {
      return this.$dayjs.unix(time).fromNow();
    },
    makeStatusTagColor(item) {
      if (item.status == "USABLE") return "green";
      if (item.status == "UNUSABLE") return "orange";
      return "red";
    },
    makeStatusTagContent(item) {
      if (item.status == "USABLE") return "대여가능";
      if (item.status == "UNUSABLE") return "대여 중";
      if (item.status == "INACTIVE") return "사용불가";
      return "ERROR";
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  $list-cell-height: 4rem;
  $padding-size: map-get($spacers, 3);
  position: relative;

  height: $list-cell-height;
  padding-left: $padding-size;
  padding-right: $padding-size;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 2);
    align-items: center;

    .numbering {
      width: $list-cell-height * 0.7;
      height: $list-cell-height * 0.7;

      line-height: $list-cell-height * 0.7;
      font-size: $h2-font-size;
      font-weight: 700;
      text-align: center;

      background-color: black;
      color: white;
    }

    .tags {
      display: flex;
      flex-direction: row;
      flex-grow: 1;

      align-items: center;
      gap: map-get($spacers, 1);
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: map-get($map: $spacers, $key: 2);
    }
  }

  .division-line {
    $position-bottom: map-get($spacers, 1);

    width: calc(100% - 2 * $padding-size);

    border-top: 1px solid $gray-200;
    position: absolute;
    bottom: $position-bottom;
  }
}
</style>
