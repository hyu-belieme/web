import type { DepartmentId, HistoryId, UserId } from "@common/types/Models";

export const stuffKeys = {
  all: ["stuffs"] as const,
  list: () => [...stuffKeys.all, "list"] as const,
  detail: () => [...stuffKeys.all, "detail"] as const
};

export const historyKeys = {
  all: ["histories"] as const,
  list: (deptId: DepartmentId, requesterId?: UserId) =>
    [...historyKeys.all, "list", deptId, requesterId] as const,
  detail: (historyId: HistoryId) => [...historyKeys.all, "detail", historyId] as const
};
