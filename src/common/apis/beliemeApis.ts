import axios from "axios";
import { List } from "immutable";
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";
import {
  BeliemeError,
  History,
  NETWORK_ERROR,
  Stuff,
  type StuffPostRequestBody,
  StuffRequestBody,
  StuffWithItems
} from "@common/types/Models";

const userStore = useUserStore();
const { userToken } = storeToRefs(userStore);

export const getAllStuffsInDept = async (deptId: string) => {
  const apiUrl = `stuffs?department-id=${deptId}`;

  return new Promise<List<Stuff>>((resolve, reject) => {
    _createInstance()
      .get<List<Stuff>>(apiUrl)
      .then((response) => {
        let output = List<Stuff>([]);
        for (const stuff of response.data) {
          output = output.push(new Stuff(stuff));
        }
        resolve(output);
      })
      .catch(_handleError(reject));
  });
};

export const getStuff = (stuffId: string) => {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .get<StuffWithItems>(apiUrl)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(_handleError(reject));
  });
};

export const postNewStuff = async (newStuff: StuffPostRequestBody) => {
  const apiUrl = `stuffs`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .post<StuffWithItems>(apiUrl, newStuff)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(_handleError(reject));
  });
};

export const editStuff = async (stuffId: string, newStuffInfo: StuffRequestBody) => {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(_handleError(reject));
  });
};

export const addNewItem = async (stuffId: string) => {
  const apiUrl = `items`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    _createInstance()
      .post<StuffWithItems>(apiUrl, {
        stuffId: stuffId
      })
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(_handleError(reject));
  });
};

export const getAllHistoryInDept = async (deptId: string) => {
  const apiUrl = `histories?department-id=${deptId}`;

  return new Promise<List<History>>((resolve, reject) => {
    _createInstance()
      .get<List<History>>(apiUrl, {
        timeout: 5000
      })
      .then((response) => {
        let output = List<History>([]);
        for (const history of response.data) {
          output = output.push(new History(history));
        }
        resolve(output);
      })
      .catch(_handleError(reject));
  });
};

export const getAllRequesterHistoryInDept = async (deptId: string, userId: string) => {
  const apiUrl = `histories?department-id=${deptId}&requester-id=${userId}`;

  return new Promise<List<History>>((resolve, reject) => {
    _createInstance()
      .get<List<History>>(apiUrl)
      .then((response) => {
        let output = List<History>([]);
        for (const history of response.data) {
          output = output.push(new History(history));
        }
        resolve(output);
      })
      .catch(_handleError(reject));
  });
};

export const getHistory = async (historyId: string) => {
  const apiUrl = `histories/${historyId}`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .get<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const rentStuff = async (stuffId: string) => {
  const apiUrl = `stuffs/${stuffId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const rentItem = async (itemId: string) => {
  const apiUrl = `items/${itemId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const reportLostItem = async (itemId: string) => {
  const apiUrl = `items/${itemId}/lost`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const approveItem = async (itemId: string) => {
  const apiUrl = `items/${itemId}/approve`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const returnItem = async (itemId: string) => {
  const apiUrl = `items/${itemId}/return`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

export const cancelItem = async (itemId: string) => {
  const apiUrl = `items/${itemId}/cancel`;

  return new Promise<History>((resolve, reject) => {
    _createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(_handleError(reject));
  });
};

function _createInstance() {
  return axios.create({
    baseURL: "http://13.209.19.51:8080/",
    timeout: 1000,
    headers: { "user-token": userToken.value }
  });
}

function _handleError(reject: (_?: any) => void) {
  return (error: any) => {
    if (error.response) {
      reject(new BeliemeError(error.response.data));
    } else {
      reject(NETWORK_ERROR);
    }
  };
}
