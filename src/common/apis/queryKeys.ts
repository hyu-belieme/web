export const stuffKeys = {
  all: ["stuffs"] as const,
  list: (univCode: string, deptCode: string) =>
    [...stuffKeys.all, "list", univCode, deptCode] as const,
  detail: (univCode: string, deptCode: string, stuffName: string) =>
    [...stuffKeys.all, "detail", univCode, deptCode, stuffName] as const
};

export const historyKeys = {
  all: ["histories"] as const,
  list: (
    univCode: string,
    deptCode: string,
    requesterIdx?: {
      univCode: string;
      name: string;
    }
  ) =>
    [
      ...historyKeys.all,
      "list",
      univCode,
      deptCode,
      requesterIdx?.univCode,
      requesterIdx?.name
    ] as const,
  detail: (
    univCode: string,
    deptCode: string,
    stuffName: string,
    itemNum: number,
    historyNum: number
  ) => [...historyKeys.all, "detail", univCode, deptCode, stuffName, itemNum, historyNum] as const
};
