import type Item from "@/models/item/Item";

export default class StuffWithItems {
  thumbnail: string;
  name: string;
  amount: number;
  count: number;
  items: Item[];

  constructor(name: string, thumbnail: string, amount: number, count: number, items: Item[]) {
    this.thumbnail = thumbnail;
    this.name = name;
    this.amount = amount;
    this.count = count;
    this.items = items;
  }
}
