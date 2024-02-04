import BaseVo from '@common/models/BaseVo';
import { Cursor, type CursorSyntax } from '@common/models/Cursor';

export interface BasePaginationWrapperSyntax {
  cursor: CursorSyntax;
}

abstract class BasePaginationWrapper extends BaseVo {
  public cursor: Cursor;

  constructor(oth: BasePaginationWrapperSyntax) {
    super();
    this.cursor = new Cursor(oth.cursor);
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof BasePaginationWrapper)) return false;
    return this.cursor.equals(oth.cursor);
  }
}

export default BasePaginationWrapper;
