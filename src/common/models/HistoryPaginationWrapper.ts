import type { BasePaginationWrapperSyntax } from '@common/models/BasePaginationWrapper';
import BasePaginationWrapper from '@common/models/BasePaginationWrapper';
import { History, type IHistory } from '@common/models/History';

export interface HistoryPaginationWrapperSyntax extends BasePaginationWrapperSyntax {
  data: IHistory[];
}

export class HistoryPaginationWrapper extends BasePaginationWrapper {
  public data: History[];

  constructor(oth: HistoryPaginationWrapperSyntax) {
    super(oth);
    this.data = oth.data.map((history) => new History(history));
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof HistoryPaginationWrapper)) return false;
    return (
      super.equals(oth) &&
      this.data.length === oth.data.length &&
      this.data.every((history, index) => history.equals(oth.data[index]))
    );
  }
}

export default HistoryPaginationWrapper;
