import User from '@common/models/User';
import type { HistoryStatus } from '@common/models/types/HistoryStatus';

class HistoryInfoOnly {
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

  constructor(oth: HistoryInfoOnly) {
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
}

export default HistoryInfoOnly;
