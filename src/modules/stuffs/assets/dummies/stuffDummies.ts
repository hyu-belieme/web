import type { StuffWithItems } from "@common/types/Models";

import { List } from "immutable";

const stuffDummies: StuffWithItems[] = [
  {
    name: "블루투스 스피커",
    thumbnail: "📻",
    amount: 2,
    count: 2,
    items: List([
      {
        num: 1,
        status: "USABLE",
        lastHistory: null
      },
      {
        num: 2,
        status: "USABLE",
        lastHistory: null
      }
    ])
  },
  {
    name: "우산",
    thumbnail: "🌂",
    amount: 5,
    count: 4,
    items: List([
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
    ])
  },
  {
    name: "축구공",
    thumbnail: "⚽️",
    amount: 3,
    count: 3,
    items: List([
      {
        num: 1,
        status: "USABLE",
        lastHistory: null
      },
      {
        num: 2,
        status: "USABLE",
        lastHistory: null
      },
      {
        num: 3,
        status: "USABLE",
        lastHistory: null
      }
    ])
  },
  {
    name: "농구공",
    thumbnail: "🏀",
    amount: 2,
    count: 0,
    items: List([
      {
        num: 1,
        status: "UNUSABLE",
        lastHistory: {
          num: 2,
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
        status: "UNUSABLE",
        lastHistory: {
          num: 1,
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
      }
    ])
  }
];

export default stuffDummies;
