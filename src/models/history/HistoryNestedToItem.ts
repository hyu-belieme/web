import type User from "@/models/user/User";

export default class HistoryNestedToItem {
  num: number;
  status: String;
  requester?: User;
  approveManager?: User;
  returnManager?: User;
  lostManager?: User;
  cancelManager?: User;
  requestedAt?: number;
  approvedAt?: number;
  returnedAt?: number;
  lostAt?: number;
  canceledAt?: number;

  constructor(
    num: number,
    status: String,
    requester?: User,
    approveManager?: User,
    returnManager?: User,
    lostManager?: User,
    cancelManager?: User,
    requestedAt?: number,
    approvedAt?: number,
    returnedAt?: number,
    lostAt?: number,
    canceledAt?: number
  ) {
    this.num = num;
    this.status = status;
    this.requester = requester;
    this.approveManager = approveManager;
    this.returnManager = returnManager;
    this.lostManager = lostManager;
    this.cancelManager = cancelManager;
    this.requestedAt = requestedAt;
    this.approvedAt = approvedAt;
    this.returnedAt = returnedAt;
    this.lostAt = lostAt;
    this.canceledAt = canceledAt;
  }
}
