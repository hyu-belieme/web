import type { HistoryId } from "@common/types/Models";
import type { DepartmentId, StuffId, UserId } from "@common/types/Models";

export const stuffKeys = {
  all: ["stuffs"] as const,
  list: (deptId: DepartmentId) => [...stuffKeys.all, "list", deptId] as const,
  detail: (stuffId: StuffId) => [...stuffKeys.all, "detail", stuffId] as const
};

export const historyKeys = {
  all: ["histories"] as const,
  list: (deptId: DepartmentId, requesterId?: UserId) =>
    [...historyKeys.all, "list", deptId, requesterId] as const,
  detail: (historyId: HistoryId) => [...historyKeys.all, "detail", historyId] as const
};
