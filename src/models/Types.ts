class University {
  constructor(private code: String, private name: String) {}
}

class User {
  constructor(
    university: University,
    studentId: String,
    name: String,
    entranceYear?: number,
    loginInfo?: LoginInfo
  ) {}
}

class LoginInfo {
  constructor(token: String, createdAt: number, approvedAt: number) {}
}

class Stuff {
  thumbnail: string;
  name: string;
  amount: number;
  count: number;

  constructor(thumbnail: string, name: string, amount: number, count: number) {
    this.thumbnail = thumbnail;
    this.name = name;
    this.amount = amount;
    this.count = count;
  }
}

class StuffWithItems {
  thumbnail: string;
  name: string;
  amount: number;
  count: number;
  items: Item[];

  constructor(name: string, thumbnail: string, amount: number, count: number, items: Item[]) {
    this.thumbnail = thumbnail;
    this.name = name;
    this.amount = amount;
    this.count = count;
    this.items = items;
  }
}

class Item {
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;

  constructor(num: number, status: string, lastHistory: HistoryNestedToItem | null) {
    this.num = num;
    this.status = status;
    this.lastHistory = lastHistory;
  }
}

class History {
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

class HistoryNestedToItem {
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

export type { University };
