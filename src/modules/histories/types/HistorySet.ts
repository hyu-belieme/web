import type History from '@common/models/History';

import type { HistoryCategory } from '@^histories/types/HistoryCategory';

export interface CategorizedHistorySet {
  category: HistoryCategory;
  histories: History[];
}
