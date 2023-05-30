import { List } from "immutable";

import type { History, HistoryStatus } from "@common/types/Models";

export const CategorizeHistories = (histories: List<History> | undefined) => {
  if (histories === undefined) return undefined;
  var output = List<CategorizedHistories>();
  HISTORY_CATEGORY_MAP.forEach((categoryMap) => {
    let targetHistories = _categorizeBy(histories, categoryMap.targetStatus);
    if (targetHistories.size === 0) return;
    output = output.push({
      category: categoryMap.category,
      histories: _categorizeBy(targetHistories, categoryMap.targetStatus)
    });
  });
  return output;
};

const _categorizeBy = (histories: List<History>, targetStatus: List<HistoryStatus>) => {
  var output = List<History>();
  for (var history of histories) {
    if (targetStatus.contains(history.status)) output = output.push(history);
  }
  return output;
};

const HISTORY_CATEGORY_MAP = List<{
  category: HistoryCategory;
  targetStatus: List<HistoryStatus>;
}>([
  { category: "REQUESTED", targetStatus: List(["REQUESTED"]) },
  { category: "USING", targetStatus: List(["USING", "DELAYED"]) },
  { category: "LOST", targetStatus: List(["LOST"]) },
  { category: "RETURNED", targetStatus: List(["RETURNED", "FOUND"]) },
  { category: "EXPIRED", targetStatus: List(["EXPIRED"]) }
]);

export type HistoryCategory = "REQUESTED" | "USING" | "LOST" | "RETURNED" | "EXPIRED";

interface CategorizedHistories {
  category: HistoryCategory;
  histories: List<History>;
}
