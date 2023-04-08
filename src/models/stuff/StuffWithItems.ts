import type Item from "@/models/item/Item";
import type { List } from "immutable";

export default class StuffWithItems {
  thumbnail: string;
  name: string;
  amount: number;
  count: number;
  items: List<Item>;

  constructor(name: string, thumbnail: string, amount: number, count: number, items: List<Item>) {
    this.thumbnail = thumbnail;
    this.name = name;
    this.amount = amount;
    this.count = count;
    this.items = items;
  }
}
