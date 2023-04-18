import type { List } from "immutable";

export interface University {
  code: string;
  name: string;
}

export interface LoginInfo {
  token: string;
  createdAt: number;
  approvedAt: number;
}

export interface User {
  university: University;
  studentId: string;
  name: string;
  entranceYear?: number;
}

export interface UserWithSecureInfo extends User {
  university: University;
  studentId: string;
  name: string;
  entranceYear?: number;
  token: string;
  createdAt: number;
  approvedAt: number;
}

export interface StuffInfoOnly {
  thumbnail: string;
  name: string;
}

export interface Stuff extends StuffInfoOnly {
  amount: number;
  count: number;
}

export interface StuffWithItems extends Stuff {
  items: List<ItemInfoOnly>;
}

export interface ItemInfoOnly {
  num: number;
  status: string;
  lastHistory: HistoryInfoOnly | null;
}

export interface Item extends ItemInfoOnly {
  stuff: StuffInfoOnly;
}

export interface HistoryInfoOnly {
  num: number;
  status: HistoryStatus;
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
}

export interface History extends HistoryInfoOnly {
  item: Item;
}

export type ItemStatus = "USABLE" | "UNUSABLE" | "INACTIVE";
export type HistoryStatus =
  | "REQUESTED"
  | "USING"
  | "DELAYED"
  | "LOST"
  | "RETURNED"
  | "FOUND"
  | "EXPIRED";
