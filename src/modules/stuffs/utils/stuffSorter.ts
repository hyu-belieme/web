import type { List } from "immutable";

import type { Stuff } from "@common/types/Models";

export function sortStuffList(stuffList: List<Stuff>) {
  return stuffList.sort((left, right) =>
    left.name > right.name ? 1 : left.name < right.name ? -1 : 0
  );
}
