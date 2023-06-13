import BaseVo from '@common/models/BaseVo';
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
export class HistoryInfoOnly extends BaseVo {
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
    super();
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
      BaseVo.equalsForNullable(this.requester, oth.requester) &&
      BaseVo.equalsForNullable(this.approveManager, oth.approveManager) &&
      BaseVo.equalsForNullable(this.returnManager, oth.returnManager) &&
      BaseVo.equalsForNullable(this.lostManager, oth.lostManager) &&
      BaseVo.equalsForNullable(this.cancelManager, oth.cancelManager) &&
      this.requestedAt === oth.requestedAt &&
      this.approvedAt === oth.approvedAt &&
      this.returnedAt === oth.returnedAt &&
      this.lostAt === oth.lostAt &&
      this.canceledAt === oth.canceledAt
    );
  }
}

export default HistoryInfoOnly;
