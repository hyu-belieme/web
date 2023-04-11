import type HistoryNestedToItem from "@/models/history/HistoryNestedToItem";
import type Stuff from "@/models/stuff/Stuff";

export default interface Item {
  stuffThumbnail: any;
  stuffName: any;
  stuff: Stuff;
  num: number;
  status: string;
  lastHistory: HistoryNestedToItem | null;
}
