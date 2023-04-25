import axios from "axios";
import { List } from "immutable";
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";
import {
  type DepartmentId,
  History,
  type HistoryId,
  Item,
  type ItemId,
  Stuff,
  type StuffId,
  type StuffInfoOnly,
  type StuffPostRequestBody,
  StuffWithItems,
  type UserId
} from "@common/types/Models";

const userStore = useUserStore();
const { userToken } = storeToRefs(userStore);

export const getAllStuffsInDept = async (deptId: DepartmentId) => {
  const { univCode, deptCode } = deptId;
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

export const getStuff = (stuffId: StuffId) => {
  const { univCode, deptCode, stuffName } = stuffId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .get<StuffWithItems>(apiUrl)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const postNewStuff = async (deptId: DepartmentId, newStuff: StuffPostRequestBody) => {
  const { univCode, deptCode } = deptId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .post<StuffWithItems>(apiUrl, newStuff)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const editStuff = async (stuffId: StuffId, newStuffInfo: StuffInfoOnly) => {
  const { univCode, deptCode, stuffName } = stuffId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch((error) => reject(error));
  });
};

export const addNewItem = async (stuffId: StuffId) => {
  const { univCode, deptCode, stuffName } = stuffId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items`;

  return new Promise<Item>((resolve, reject) => {
    _createInstance()
      .post<Item>(apiUrl)
      .then((response) => resolve(new Item(response.data)))
      .catch((error) => reject(error));
  });
};

export const getAllHistoryInDept = async (deptId: DepartmentId) => {
  const { univCode, deptCode } = deptId;
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

export const getAllRequesterHistoryInDept = async (deptId: DepartmentId, userId: UserId) => {
  const { univCode, deptCode } = deptId;
  const requesterUnivCode = userId.univCode;
  const requesterStudentId = userId.studentId;
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

export const getHistory = async (historyId: HistoryId) => {
  const { univCode, deptCode, stuffName, itemNum, historyNum } = historyId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/histories/${historyNum}`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .get<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const rentStuff = async (stuffId: StuffId) => {
  const { univCode, deptCode, stuffName } = stuffId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/reserve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const rentItem = async (itemId: ItemId) => {
  const { univCode, deptCode, stuffName, itemNum } = itemId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/reserve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => {
        if (error.response) {
          reject(error.response.data.message);
        } else {
          reject(
            "현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요."
          );
        }
      });
  });
};

export const reportLostItem = async (itemId: ItemId) => {
  const { univCode, deptCode, stuffName, itemNum } = itemId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/lost`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const approveItem = async (itemId: ItemId) => {
  const { univCode, deptCode, stuffName, itemNum } = itemId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/approve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const returnItem = async (itemId: ItemId) => {
  const { univCode, deptCode, stuffName, itemNum } = itemId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/return`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};

export const cancelItem = async (itemId: ItemId) => {
  const { univCode, deptCode, stuffName, itemNum } = itemId;
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/cancel`;

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
