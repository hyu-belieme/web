import BaseVo from '@common/models/BaseVo';

export interface CursorSyntax {
  size: number;
  next: string | null;
}

export class Cursor extends BaseVo {
  public static NIL: Cursor = new Cursor({
    size: 0,
    next: null,
  });

  public size: number;

  public next: string | null;

  constructor(oth: CursorSyntax) {
    super();
    this.size = oth.size;
    this.next = oth.next;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof Cursor)) return false;
    return this.size === oth.size && this.next === oth.next;
  }
}

export default Cursor;
