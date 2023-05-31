import axios from 'axios';
import { List } from 'immutable';
import { storeToRefs } from 'pinia';

import { BaseError, NETWORK_ERROR } from '@common/errors/BaseError';
import History from '@common/models/History';
import Stuff from '@common/models/Stuff';
import type StuffPostRequestBody from '@common/models/StuffPostRequestBody';
import type StuffRequestBody from '@common/models/StuffRequestBody';
import StuffWithItems from '@common/models/StuffWithItems';
import useUserStore from '@common/stores/userStore';

const userStore = useUserStore();
const { userToken } = storeToRefs(userStore);

function createInstance() {
  return axios.create({
    baseURL: 'http://13.209.19.51:8080/',
    timeout: 1000,
    headers: { 'user-token': userToken.value },
  });
}

function handleError(reject: (_?: any) => void) {
  return (error: any) => {
    if (error.response) {
      reject(new BaseError(error.response.data));
    } else {
      reject(NETWORK_ERROR);
    }
  };
}

export function getAllStuffsInDept(deptId: string) {
  const apiUrl = `stuffs?department-id=${deptId}`;

  return new Promise<List<Stuff>>((resolve, reject) => {
    createInstance()
      .get<List<Stuff>>(apiUrl)
      .then((response) => {
        let output = List<Stuff>([]);
        response.data.forEach((stuff) => {
          output = output.push(new Stuff(stuff));
        });
        resolve(output);
      })
      .catch(handleError(reject));
  });
}

export function getStuff(stuffId: string) {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    createInstance()
      .get<StuffWithItems>(apiUrl)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function postNewStuff(newStuff: StuffPostRequestBody) {
  const apiUrl = 'stuffs';

  return new Promise<StuffWithItems>((resolve, reject) => {
    createInstance()
      .post<StuffWithItems>(apiUrl, newStuff)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function editStuff(stuffId: string, newStuffInfo: StuffRequestBody) {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    createInstance()
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function addNewItem(stuffId: string) {
  const apiUrl = 'items';

  return new Promise<StuffWithItems>((resolve, reject) => {
    createInstance()
      .post<StuffWithItems>(apiUrl, {
        stuffId,
      })
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function getAllHistoryInDept(deptId: string) {
  const apiUrl = `histories?department-id=${deptId}`;

  return new Promise<List<History>>((resolve, reject) => {
    createInstance()
      .get<List<History>>(apiUrl, {
        timeout: 5000,
      })
      .then((response) => {
        let output = List<History>([]);
        response.data.forEach((history) => {
          output = output.push(new History(history));
        });
        resolve(output);
      })
      .catch(handleError(reject));
  });
}

export function getAllRequesterHistoryInDept(deptId: string, userId: string) {
  const apiUrl = `histories?department-id=${deptId}&requester-id=${userId}`;

  return new Promise<List<History>>((resolve, reject) => {
    createInstance()
      .get<List<History>>(apiUrl)
      .then((response) => {
        let output = List<History>([]);
        response.data.forEach((history) => {
          output = output.push(new History(history));
        });
        resolve(output);
      })
      .catch(handleError(reject));
  });
}

export function getHistory(historyId: string) {
  const apiUrl = `histories/${historyId}`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .get<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function rentStuff(stuffId: string) {
  const apiUrl = `stuffs/${stuffId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function rentItem(itemId: string) {
  const apiUrl = `items/${itemId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function reportLostItem(itemId: string) {
  const apiUrl = `items/${itemId}/lost`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function approveItem(itemId: string) {
  const apiUrl = `items/${itemId}/approve`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function returnItem(itemId: string) {
  const apiUrl = `items/${itemId}/return`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function cancelItem(itemId: string) {
  const apiUrl = `items/${itemId}/cancel`;

  return new Promise<History>((resolve, reject) => {
    createInstance()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}
