import { List, Map } from "immutable";

import type { History, HistoryStatus } from "@common/types/Models";

export function sortHistoryList(historyList: List<History>) {
  const historyStatusPriority = _makeStatusPriorityMap(_basicHistorySequence);
  return historyList.sort((left, right) => {
    let statusComp = _compareHistoryStatus(historyStatusPriority, left.status, right.status);
    if (statusComp !== 0) return statusComp;

    return _compareHistoryTimes(left, right);
  });
}

const _basicHistorySequence = List([
  List<HistoryStatus>(["REQUESTED"]),
  List<HistoryStatus>(["USING", "DELAYED"]),
  List<HistoryStatus>(["LOST"]),
  List<HistoryStatus>(["RETURNED", "FOUND"]),
  List<HistoryStatus>(["EXPIRED"])
]);

function _makeStatusPriorityMap(sequence: List<List<HistoryStatus>>) {
  let statusPriority: Map<HistoryStatus, number> = Map();
  sequence.forEach((statuses, index) => {
    statuses.forEach((e) => (statusPriority = statusPriority.set(e, index)));
  });
  return statusPriority;
}

function _compareHistoryStatus(
  statusPriority: Map<HistoryStatus, number>,
  left: HistoryStatus,
  right: HistoryStatus
) {
  if (!statusPriority.has(left) && !statusPriority.has(right)) return 0;
  if (!statusPriority.has(left)) return -1;
  if (!statusPriority.has(right)) return 1;
  return statusPriority.get(left)! - statusPriority.get(right)!;
}

function _compareHistoryTimes(left: History, right: History) {
  if (left.status === "REQUESTED" || left.status === "EXPIRED") {
    return (right.requestedAt || 0) - (left.requestedAt || 0);
  } else if (left.status === "USING" || left.status === "DELAYED") {
    return (right.approvedAt || 0) - (left.approvedAt || 0);
  } else if (left.status === "LOST") {
    return (right.lostAt || 0) - (left.lostAt || 0);
  } else if (left.status === "RETURNED" || left.status === "FOUND") {
    return (right.approvedAt || right.lostAt || 0) - (left.approvedAt || left.lostAt || 0);
  }
  return 0;
}
