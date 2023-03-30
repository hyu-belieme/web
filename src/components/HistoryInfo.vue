<script setup>
import InfoCell from "@/components/InfoCell.vue";
</script>

<template>
  <section class="history-info">
    <section class="label">
      <section class="icon">{{ history.item.stuffThumbnail }}</section>
      <section class="name">{{ history.item.stuffName }} #{{ history.item.num }}</section>
    </section>
    <section class="info-list">
      <InfoCell
        v-if="history.requestedAt != null"
        v-bind="{ keyword: '대여 요청된 시각', value: timeToString(history.requestedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="history.approvedAt != null"
        v-bind="{ keyword: '대여 승인된 시각', value: timeToString(history.approvedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="history.lostAt != null"
        v-bind="{ keyword: '분실 등록된 시각', value: timeToString(history.lostAt) }"
      ></InfoCell>
      <InfoCell
        v-if="history.returnedAt != null"
        v-bind="{ keyword: '반납 승인된 시각', value: timeToString(history.returnedAt) }"
      ></InfoCell>
      <InfoCell
        v-if="history.canceledAt != null"
        v-bind="{ keyword: '취소된 시각', value: timeToString(history.canceledAt) }"
      ></InfoCell>
    </section>
    <section class="info-list">
      <InfoCell
        v-if="history.requester != null"
        v-bind="{ keyword: '대여 요청자', value: nameAndStudentIdFormat(history.requester) }"
      ></InfoCell>
      <InfoCell
        v-if="history.approveManager != null"
        v-bind="{
          keyword: '대여 승인 담당자',
          value: nameAndStudentIdFormat(history.approveManager)
        }"
      ></InfoCell>
      <InfoCell
        v-if="history.returnManager != null"
        v-bind="{
          keyword: '분실 등록 담당자',
          value: nameAndStudentIdFormat(history.returnManager)
        }"
      ></InfoCell>
      <InfoCell
        v-if="history.lostManager != null"
        v-bind="{ keyword: '반납 승인 담당자', value: nameAndStudentIdFormat(history.lostManager) }"
      ></InfoCell>
      <InfoCell
        v-if="history.cancelManager != null"
        v-bind="{ keyword: '취소 요청자', value: nameAndStudentIdFormat(history.cancelManager) }"
      ></InfoCell>
    </section>
    <section class="buttons">
      <button class="btn btn-primary btn-sm">승인하기</button>
      <button class="btn btn-danger btn-sm">취소하기</button>
    </section>
  </section>
</template>

<script>
export default {
  name: "HistoryInfo",
  data() {
    return {
      history: {
        item: {
          stuffName: "우산",
          stuffThumbnail: "🌂",
          num: 1,
          status: "USABLE",
          lastHistory: {
            num: 7,
            status: "EXPIRED",
            requestedAt: 1680076901,
            requester: {
              university: {
                code: "DEV",
                name: "DEV"
              },
              studentId: "DEV1",
              name: "개발자1"
            }
          }
        },
        num: 2,
        status: "FOUND",
        lostAt: 1678278730,
        lostManager: {
          university: {
            code: "DEV",
            name: "DEV"
          },
          studentId: "DEV1",
          name: "개발자1"
        },
        returnedAt: 1678278740,
        returnManager: {
          university: {
            code: "DEV",
            name: "DEV"
          },
          studentId: "DEV1",
          name: "개발자1"
        },
        university: {
          code: "HYU",
          name: "한양대학교"
        },
        department: {
          code: "CSE",
          name: "컴퓨터 소프트웨어학부",
          baseMajors: ["FH04067", "FH04068"]
        }
      }
    };
  },
  methods: {
    timeToString(time) {
      return this.$dayjs.unix(time).format("llll");
    },

    nameAndStudentIdFormat(user) {
      return `${user.name} (${user.studentId})`;
    }
  }
};
</script>

<style lang="scss" scoped>
.history-info {
  display: flex;
  flex-direction: column;

  gap: map-get($map: $spacers, $key: 4);

  .label {
    $label-height: 4rem;

    width: 100%;
    height: $label-height;

    display: flex;
    flex-direction: row;
    gap: map-get($spacers, 1);
    align-items: stretch;

    .icon {
      line-height: $label-height;
      font-size: $h1-font-size;
    }

    .name {
      line-height: $label-height;
      font-size: $h3-font-size;
      flex-grow: 1;
    }
  }

  .info-list {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: map-get($map: $spacers, $key: 2);
  }
}
</style>
