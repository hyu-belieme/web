import type Item from "@/models/item/Item";
import type User from "@/models/user/User";

export default interface History {
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
