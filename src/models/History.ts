import type { Item } from "@/models/Item";
import type { User } from "@/models/User";

class History {
  constructor(
    item: Item,
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
  ) {}
}

export type { History };
