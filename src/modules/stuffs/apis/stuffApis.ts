import { List } from "immutable";

import serverApi from "@common/apis/beliemeApiInstance";
import { History, Item, Stuff, type StuffInfoOnly, StuffWithItems } from "@common/types/Models";

export const getAllStuffsInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return new Promise<List<Stuff>>((resolve, reject) => {
    serverApi()
      .get<List<Stuff>>(apiUrl)
      .then((response) => {
        let output = List<Stuff>([]);
        for (let stuff of response.data) {
          output = output.push(new Stuff(stuff));
        }
        resolve(output);
      })
      .catch((error) => reject(error));
  });
};

export const getStuff = (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    serverApi()
      .get<StuffWithItems>(apiUrl)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const postNewStuff = async (
  univCode: string,
  deptCode: string,
  newStuff: StuffPostRequestBody
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    serverApi()
      .post<StuffWithItems>(apiUrl, newStuff)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const editStuff = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  newStuffInfo: StuffInfoOnly
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    serverApi()
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const addNewItem = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items`;

  return new Promise<Item>((resolve, reject) => {
    serverApi()
      .post<Item>(apiUrl)
      .then((response) => resolve(new Item(response.data)))
      .catch((error) => reject(error));
  });
};

export const rentStuff = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/reserve`;

  return new Promise<History>((resolve, reject) => {
    serverApi()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const rentItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/reserve`;

  return new Promise<History>((resolve, reject) => {
    serverApi()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const reportLostItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/lost`;

  return new Promise<History>((resolve, reject) => {
    serverApi()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const returnItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/return`;

  return new Promise<History>((resolve, reject) => {
    serverApi()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

interface StuffPostRequestBody extends StuffInfoOnly {
  amount?: number;
}
