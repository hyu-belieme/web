import { List } from 'immutable';

import type History from '@common/models/History';
import type HistoryStatus from '@common/models/types/HistoryStatus';

import type { CategorizedHistories } from '@^histories/types/CategorizedHistories';
import type { HistoryCategory } from '@^histories/types/HistoryCategory';

const HISTORY_CATEGORY_MAP = List<{
  category: HistoryCategory;
  targetStatus: List<HistoryStatus>;
}>([
  { category: 'REQUESTED', targetStatus: List(['REQUESTED']) },
  { category: 'USING', targetStatus: List(['USING', 'DELAYED']) },
  { category: 'LOST', targetStatus: List(['LOST']) },
  { category: 'RETURNED', targetStatus: List(['RETURNED', 'FOUND']) },
  { category: 'EXPIRED', targetStatus: List(['EXPIRED']) },
]);

function categorizeBy(histories: List<History>, targetStatus: List<HistoryStatus>) {
  let output = List<History>();
  histories.forEach((history) => {
    if (targetStatus.contains(history.status)) output = output.push(history);
  });
  return output;
}

function CategorizeHistories(histories: List<History>) {
  let output = List<CategorizedHistories>();
  HISTORY_CATEGORY_MAP.forEach((categoryMap) => {
    const targetHistories = categorizeBy(histories, categoryMap.targetStatus);
    if (targetHistories.size === 0) return;
    output = output.push({
      category: categoryMap.category,
      histories: categorizeBy(targetHistories, categoryMap.targetStatus),
    });
  });
  return output;
}

export default CategorizeHistories;
