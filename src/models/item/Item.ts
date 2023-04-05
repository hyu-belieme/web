import type HistoryNestedToItem from "@/models/history/HistoryNestedToItem";

export default class Item {
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;

  constructor(num: number, status: string, lastHistory: HistoryNestedToItem | null) {
    this.num = num;
    this.status = status;
    this.lastHistory = lastHistory;
  }
}
