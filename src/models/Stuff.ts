import type { Item } from "@/models/Item";

class Stuff {
  constructor(name: String, thumbnail: String, amount: number, count: number) {}
}

class StuffWithItems {
  constructor(name: String, thumbnail: String, amount: number, count: number, items: Item[]) {}
}

export type { Stuff, StuffWithItems };
