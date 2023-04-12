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
  loginInfo?: LoginInfo;
}

export interface Stuff {
  thumbnail: string;
  name: string;
  amount: number;
  count: number;
}

export interface StuffWithItems extends Stuff {
  items: List<ItemNestedToStuff>;
}

export interface Item {
  stuffThumbnail: any;
  stuffName: any;
  stuff: Stuff;
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;
}

export interface ItemNestedToStuff {
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;
}

export type HistoryStatus = "REQUESTED" | "USING" | "DELAYED" | "LOST" | "RETURNED" | "EXPIRED";

export interface History {
  item: Item;
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

export interface HistoryNestedToItem {
  num: number;
  status: string;
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
