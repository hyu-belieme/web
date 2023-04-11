import type HistoryNestedToItem from "@/models/history/HistoryNestedToItem";

export default interface ItemNestedToStuff {
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;
}
