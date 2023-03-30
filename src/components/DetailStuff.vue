<script setup>
import StuffInfo from "@/components/StuffInfo.vue";
import ItemList from "@/components/ItemList.vue";
</script>

<template>
  <section class="stuff-detail">
    <StuffInfo v-bind="{ stuff: stuff }"></StuffInfo>
    <ItemList v-bind="{ items: stuff.itemList }"></ItemList>
  </section>
</template>

<script>
export default {
  name: "DetailStuff",
  data() {
    return {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 4,
        itemList: [
          {
            num: 1,
            status: "UNUSABLE",
            lastHistory: {
              num: 8,
              status: "USING",
              requestedAt: 1680180782,
              requester: {
                university: {
                  code: "DEV",
                  name: "DEV"
                },
                studentId: "DEV3",
                name: "개발자1"
              },
              approvedAt: 1680180795,
              approveManager: {
                university: {
                  code: "DEV",
                  name: "DEV"
                },
                studentId: "DEV3",
                name: "개발자1"
              }
            }
          },
          {
            num: 2,
            status: "USABLE",
            lastHistory: {
              num: 2,
              status: "RETURNED",
              requestedAt: 1678275343,
              requester: {
                university: {
                  code: "DEV",
                  name: "DEV"
                },
                studentId: "DEV1",
                name: "개발자1"
              },
              approvedAt: 1678275747,
              approveManager: {
                university: {
                  code: "DEV",
                  name: "DEV"
                },
                studentId: "DEV1",
                name: "개발자1"
              },
              returnedAt: 1678276386,
              returnManager: {
                university: {
                  code: "DEV",
                  name: "DEV"
                },
                studentId: "DEV1",
                name: "개발자1"
              }
            }
          },
          {
            num: 3,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 4,
            status: "USABLE",
            lastHistory: null
          },
          {
            num: 5,
            status: "USABLE",
            lastHistory: null
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.stuff-detail {
  display: flex;
  flex-direction: column;

  padding: map-get($map: $spacers, $key: 4);
  gap: map-get($map: $spacers, $key: 4);

  .stuff-info {
    flex-grow: 0;
  }

  .item-list {
    flex-grow: 1;
  }
}
</style>
