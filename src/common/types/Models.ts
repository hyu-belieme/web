import { List } from "immutable";

export interface UniversityId {
  univCode: string;
}

export interface DepartmentId extends UniversityId {
  deptCode: string;
}

export interface UserId extends UniversityId {
  studentId: string;
}

export interface StuffId extends DepartmentId {
  stuffName: string;
}

export interface ItemId extends StuffId {
  itemNum: number;
}

export interface HistoryId extends ItemId {
  historyNum: number;
}

export class University {
  public code: string;
  public name: string;

  constructor(oth: University) {
    this.code = oth.code;
    this.name = oth.name;
  }
}

export class LoginInfo {
  public token: string;
  public createdAt: number;
  public approvedAt: number;

  constructor(oth: LoginInfo) {
    this.token = oth.token;
    this.createdAt = oth.createdAt;
    this.approvedAt = oth.approvedAt;
  }
}

export class User {
  public university: University;
  public studentId: string;
  public name: string;
  public entranceYear?: number;

  constructor(oth: User) {
    this.university = new University(oth.university);
    this.studentId = oth.studentId;
    this.name = oth.name;
    this.entranceYear = oth.entranceYear;
  }
}

export class UserWithSecureInfo extends User {
  public token: string;
  public createdAt: number;
  public approvedAt: number;

  constructor(oth: UserWithSecureInfo) {
    super(oth);
    this.token = oth.token;
    this.createdAt = oth.createdAt;
    this.approvedAt = oth.approvedAt;
  }
}

export class StuffInfoOnly {
  public name: string;
  public thumbnail: string;

  constructor(oth: StuffInfoOnly) {
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
  }
}

export class Stuff extends StuffInfoOnly {
  public amount: number;
  public count: number;

  constructor(oth: Stuff) {
    super(oth);
    this.amount = oth.amount;
    this.count = oth.count;
  }
}

export class StuffWithItems extends Stuff {
  items: List<ItemInfoOnly>;

  constructor(oth: StuffWithItems) {
    super(oth);
    this.items = List(oth.items);
  }
}

export class StuffPostRequestBody extends StuffInfoOnly {
  amount?: number;

  constructor(oth: Stuff) {
    super(oth);
    this.amount = oth.amount;
  }
}

export class ItemInfoOnly {
  public num: number;
  public status: string;
  public lastHistory: HistoryInfoOnly | null;

  constructor(oth: ItemInfoOnly) {
    this.num = oth.num;
    this.status = oth.status;
    this.lastHistory = oth.lastHistory ? new HistoryInfoOnly(oth.lastHistory) : null;
  }
}

export class Item extends ItemInfoOnly {
  public stuff: StuffInfoOnly;

  constructor(oth: Item) {
    super(oth);
    this.stuff = new StuffInfoOnly(oth.stuff);
  }
}

export class HistoryInfoOnly {
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

export class History extends HistoryInfoOnly {
  public item: Item;

  constructor(oth: History) {
    super(oth);
    this.item = new Item(oth.item);
  }
}

export class BeliemeError {
  public name: string;
  public message: string;

  constructor(oth: BeliemeError) {
    this.name = oth.name;
    this.message = oth.message;
  }
}

export const NETWORK_ERROR = {
  name: "NETWORK_ERROR",
  message:
    "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
} as const;

export type ItemStatus = "USABLE" | "UNUSABLE" | "INACTIVE";
export type HistoryStatus =
  | "REQUESTED"
  | "USING"
  | "DELAYED"
  | "LOST"
  | "RETURNED"
  | "FOUND"
  | "EXPIRED";
