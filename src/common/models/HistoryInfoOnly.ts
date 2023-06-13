import User, { type IUser } from '@common/models/User';
import type HistoryStatus from '@common/models/types/HistoryStatus';

export interface IHistoryInfoOnly {
  id: string;
  num: number;
  status: HistoryStatus;
  requester?: IUser;
  approveManager?: IUser;
  returnManager?: IUser;
  lostManager?: IUser;
  cancelManager?: IUser;
  requestedAt?: number;
  approvedAt?: number;
  returnedAt?: number;
  lostAt?: number;
  canceledAt?: number;
}

function equalsForNullable(a: User | undefined, b: User | undefined) {
  if (a === undefined) {
    return b === undefined;
  }
  return a.equals(b);
}

export class HistoryInfoOnly {
  public static NIL: HistoryInfoOnly = new HistoryInfoOnly({
    id: '',
    num: 0,
    status: 'REQUESTED',
  });

  public id: string;

  public num: number;

  public status: HistoryStatus;

  public requester?: User;

  public approveManager?: User;

  public returnManager?: User;

  public lostManager?: User;

  public cancelManager?: User;

  public requestedAt?: number;

  public approvedAt?: number;

  public returnedAt?: number;

  public lostAt?: number;

  public canceledAt?: number;

  constructor(oth: IHistoryInfoOnly) {
    this.id = oth.id;
    this.num = oth.num;
    this.status = oth.status;
    this.requester = oth.requester ? new User(oth.requester) : undefined;
    this.approveManager = oth.approveManager ? new User(oth.approveManager) : undefined;
    this.returnManager = oth.returnManager ? new User(oth.returnManager) : undefined;
    this.lostManager = oth.lostManager ? new User(oth.lostManager) : undefined;
    this.cancelManager = oth.cancelManager ? new User(oth.cancelManager) : undefined;
    this.requestedAt = oth.requestedAt;
    this.approvedAt = oth.approvedAt;
    this.returnedAt = oth.returnedAt;
    this.lostAt = oth.lostAt;
    this.canceledAt = oth.canceledAt;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof HistoryInfoOnly)) return false;
    return (
      this.id === oth.id &&
      this.num === oth.num &&
      this.status === oth.status &&
      equalsForNullable(this.requester, oth.requester) &&
      equalsForNullable(this.approveManager, oth.approveManager) &&
      equalsForNullable(this.returnManager, oth.returnManager) &&
      equalsForNullable(this.lostManager, oth.lostManager) &&
      equalsForNullable(this.cancelManager, oth.cancelManager) &&
      this.requestedAt === oth.requestedAt &&
      this.approvedAt === oth.approvedAt &&
      this.returnedAt === oth.returnedAt &&
      this.lostAt === oth.lostAt &&
      this.canceledAt === oth.canceledAt
    );
  }
}

export default HistoryInfoOnly;
