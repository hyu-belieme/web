import type ItemNestedToStuff from "@/models/item/ItemNestedToStuff";
import type Stuff from "@/models/stuff/Stuff";
import type { List } from "immutable";

export default interface StuffWithItems extends Stuff {
  items: List<ItemNestedToStuff>;
}
