import { List, Map } from 'immutable';

import type History from '@common/models/History';
import type HistoryStatus from '@common/models/types/HistoryStatus';

const BASIC_HISTORY_SEQUENCE = List([
  List<HistoryStatus>(['REQUESTED']),
  List<HistoryStatus>(['USING', 'DELAYED']),
  List<HistoryStatus>(['LOST']),
  List<HistoryStatus>(['RETURNED', 'FOUND']),
  List<HistoryStatus>(['EXPIRED']),
]);

function makeStatusPriorityMap(sequence: List<List<HistoryStatus>>) {
  let statusPriority: Map<HistoryStatus, number> = Map();
  sequence.forEach((statuses, index) => {
    statuses.forEach((e) => {
      statusPriority = statusPriority.set(e, index);
    });
  });
  return statusPriority;
}

function compareHistoryStatus(
  statusPriority: Map<HistoryStatus, number>,
  left: HistoryStatus,
  right: HistoryStatus
) {
  if (!statusPriority.has(left) && !statusPriority.has(right)) return 0;
  if (!statusPriority.has(left)) return -1;
  if (!statusPriority.has(right)) return 1;
  return statusPriority.get(left)! - statusPriority.get(right)!;
}

function compareHistoryTimes(left: History, right: History) {
  if (left.status === 'REQUESTED' || left.status === 'EXPIRED') {
    return (right.requestedAt || 0) - (left.requestedAt || 0);
  }
  if (left.status === 'USING' || left.status === 'DELAYED') {
    return (right.approvedAt || 0) - (left.approvedAt || 0);
  }
  if (left.status === 'LOST') {
    return (right.lostAt || 0) - (left.lostAt || 0);
  }
  if (left.status === 'RETURNED' || left.status === 'FOUND') {
    return (right.approvedAt || right.lostAt || 0) - (left.approvedAt || left.lostAt || 0);
  }
  return 0;
}

function sortHistoryList(
  historyList: List<History>,
  sequence: List<List<HistoryStatus>> = BASIC_HISTORY_SEQUENCE
) {
  const historyStatusPriority = makeStatusPriorityMap(sequence);
  return historyList.sort((left, right) => {
    const statusComp = compareHistoryStatus(historyStatusPriority, left.status, right.status);
    if (statusComp !== 0) return statusComp;

    return compareHistoryTimes(left, right);
  });
}

export default sortHistoryList;
