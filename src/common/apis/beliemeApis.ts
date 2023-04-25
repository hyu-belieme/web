import axios from "axios";
import { List } from "immutable";
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";
import {
  History,
  Item,
  Stuff,
  type StuffInfoOnly,
  type StuffPostRequestBody,
  StuffWithItems
} from "@common/types/Models";

const userStore = useUserStore();
const { userToken } = storeToRefs(userStore);

export const getAllStuffsInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return new Promise<List<Stuff>>((resolve, reject) => {
    _createInstance()
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
    _createInstance()
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
    _createInstance()
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
    _createInstance()
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const addNewItem = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items`;

  return new Promise<Item>((resolve, reject) => {
    _createInstance()
      .post<Item>(apiUrl)
      .then((response) => resolve(new Item(response.data)))
      .catch((error) => reject(error));
  });
};

export const getAllHistoryInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/histories`;

  return new Promise<List<History>>((resolve, reject) => {
    _createInstance()
      .get<List<History>>(apiUrl)
      .then((response) => {
        let output = List<History>([]);
        for (let history of response.data) {
          output = output.push(new History(history));
        }
        resolve(output);
      })
      .catch((error) => reject(error));
  });
};

export const getAllRequesterHistoryInDept = async (
  univCode: string,
  deptCode: string,
  requesterUnivCode: string,
  requesterStudentId: string
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/histories?requester-university-code=${requesterUnivCode}&requester-student-id=${requesterStudentId}`;

  return new Promise<List<History>>((resolve, reject) => {
    _createInstance()
      .get<List<History>>(apiUrl)
      .then((response) => {
        let output = List<History>([]);
        for (let history of response.data) {
          output = output.push(new History(history));
        }
        resolve(output);
      })
      .catch((error) => reject(error));
  });
};

export const getHistory = async (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/histories/${historyNum}`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .get<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const rentStuff = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/reserve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
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
    _createInstance()
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
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const approveItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/approve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
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
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const cancelItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/cancel`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

const _createInstance = () => {
  return axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000,
    headers: { "user-token": userToken.value }
  });
};
