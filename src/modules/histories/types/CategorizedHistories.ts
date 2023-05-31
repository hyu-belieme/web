import type { List } from 'immutable';

import type History from '@common/models/History';

import type { HistoryCategory } from '@^histories/types/HistoryCategory';

export interface CategorizedHistories {
  category: HistoryCategory;
  histories: List<History>;
}
