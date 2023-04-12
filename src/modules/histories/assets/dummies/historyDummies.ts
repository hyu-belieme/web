import type { History } from "@common/types/Models";
import { List } from "immutable";

const historyDummies: List<History> = List([
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 2,
      status: "UNUSABLE",
      lastHistory: {
        num: 3,
        status: "REQUESTED",
        requestedAt: 1681189989,
        requester: {
          university: {
            code: "HYU",
            name: "한양대학교"
          },
          studentId: "2018008886",
          name: "이석환",
          entranceYear: 2018
        }
      }
    },
    num: 3,
    status: "REQUESTED",
    requestedAt: 1681189989,
    requester: {
      university: {
        code: "HYU",
        name: "한양대학교"
      },
      studentId: "2018008886",
      name: "이석환",
      entranceYear: 2018
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
  },
  {
    item: {
      stuff: {
        name: "농구공",
        thumbnail: "🏀",
        amount: 2,
        count: 1
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 1,
        status: "USING",
        requestedAt: 1681189661,
        requester: {
          university: {
            code: "HYU",
            name: "한양대학교"
          },
          studentId: "2018008886",
          name: "이석환",
          entranceYear: 2018
        },
        approvedAt: 1681189672,
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
    num: 1,
    status: "USING",
    requestedAt: 1681189661,
    requester: {
      university: {
        code: "HYU",
        name: "한양대학교"
      },
      studentId: "2018008886",
      name: "이석환",
      entranceYear: 2018
    },
    approvedAt: 1681189672,
    approveManager: {
      university: {
        code: "DEV",
        name: "DEV"
      },
      studentId: "DEV3",
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
  },
  {
    item: {
      stuff: {
        name: "블루투스 스피커",
        thumbnail: "📻",
        amount: 2,
        count: 1
      },
      num: 1,
      status: "INACTIVE",
      lastHistory: {
        num: 1,
        status: "LOST",
        lostAt: 1681189689,
        lostManager: {
          university: {
            code: "DEV",
            name: "DEV"
          },
          studentId: "DEV3",
          name: "개발자1"
        }
      }
    },
    num: 1,
    status: "LOST",
    lostAt: 1681189689,
    lostManager: {
      university: {
        code: "DEV",
        name: "DEV"
      },
      studentId: "DEV3",
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 1,
    status: "EXPIRED",
    requestedAt: 1678276395,
    requester: {
      university: {
        code: "DEV",
        name: "DEV"
      },
      studentId: "DEV1",
      name: "개발자1"
    },
    canceledAt: 1678276717,
    cancelManager: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 3,
    status: "EXPIRED",
    requestedAt: 1678677186,
    requester: {
      university: {
        code: "DEV",
        name: "DEV"
      },
      studentId: "DEV1",
      name: "개발자1"
    },
    canceledAt: 1678677201,
    cancelManager: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 4,
    status: "EXPIRED",
    requestedAt: 1678677240,
    requester: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 5,
    status: "EXPIRED",
    requestedAt: 1678795794,
    requester: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 6,
    status: "EXPIRED",
    requestedAt: 1678799387,
    requester: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 8,
        status: "DELAYED",
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
    num: 8,
    status: "DELAYED",
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
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
    num: 1,
    status: "EXPIRED",
    requestedAt: 1678262948,
    requester: {
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
  },
  {
    item: {
      stuff: {
        name: "우산",
        thumbnail: "🌂",
        amount: 5,
        count: 5
      },
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
  },
  {
    item: {
      stuff: {
        name: "축구공",
        thumbnail: "⚽️",
        amount: 3,
        count: 2
      },
      num: 1,
      status: "UNUSABLE",
      lastHistory: {
        num: 1,
        status: "USING",
        requestedAt: 1681189545,
        requester: {
          university: {
            code: "HYU",
            name: "한양대학교"
          },
          studentId: "2018008886",
          name: "이석환",
          entranceYear: 2018
        },
        approvedAt: 1681189635,
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
    num: 1,
    status: "USING",
    requestedAt: 1681189545,
    requester: {
      university: {
        code: "HYU",
        name: "한양대학교"
      },
      studentId: "2018008886",
      name: "이석환",
      entranceYear: 2018
    },
    approvedAt: 1681189635,
    approveManager: {
      university: {
        code: "DEV",
        name: "DEV"
      },
      studentId: "DEV3",
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
]);

export default historyDummies;
