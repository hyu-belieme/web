import axios from 'axios';
import { List } from 'immutable';

import BaseError from '@common/errors/BaseError';
import History from '@common/models/History';
import Stuff from '@common/models/Stuff';
import type StuffPostRequestBody from '@common/models/StuffPostRequestBody';
import type StuffRequestBody from '@common/models/StuffRequestBody';
import StuffWithItems from '@common/models/StuffWithItems';
import User from '@common/models/User';
import UserWithSecureInfo from '@common/models/UserWithSecureInfo';

const NETWORK_ERROR: BaseError = {
  name: 'NETWORK_ERROR',
  message:
    '현재 네트워크가 불안하여 서버와 연결이 원할하지 못하거나 서버에 예상하지 못한 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
} as const;

const API_SERVER_INSTANCE_CONFIG = {
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  timeout: 1000,
};

function handleError(reject: (_?: any) => void) {
  return (error: any) => {
    if (error.response) {
      reject(new BaseError(error.response.data));
    } else {
      reject(NETWORK_ERROR);
    }
  };
}

export function loginUsingHanyangApiToken(apiToken: string) {
  const apiUrl = `/universities/37364342-4345-3342-4143-344334433445/login`;

  return new Promise<UserWithSecureInfo>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'api-token': apiToken },
      })
      .patch<UserWithSecureInfo>(apiUrl)
      .then((response) => resolve(new UserWithSecureInfo(response.data)))
      .catch(handleError(reject));
  });
}

export function getCurrentUserInfo(userToken: string) {
  const apiUrl = `/my`;

  return new Promise<User>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .get<User>(apiUrl)
      .then((response) => resolve(new User(response.data)))
      .catch(handleError(reject));
  });
}

export function getAllStuffsInDept(userToken: string, deptId: string) {
  const apiUrl = `stuffs?department-id=${deptId}`;

  return new Promise<List<Stuff>>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
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

export function getStuff(userToken: string, stuffId: string) {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .get<StuffWithItems>(apiUrl)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function postNewStuff(userToken: string, newStuff: StuffPostRequestBody) {
  const apiUrl = 'stuffs';

  return new Promise<StuffWithItems>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .post<StuffWithItems>(apiUrl, newStuff)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function editStuff(userToken: string, stuffId: string, newStuffInfo: StuffRequestBody) {
  const apiUrl = `stuffs/${stuffId}`;

  return new Promise<StuffWithItems>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<StuffWithItems>(apiUrl, newStuffInfo)
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function addNewItem(userToken: string, stuffId: string) {
  const apiUrl = 'items';

  return new Promise<StuffWithItems>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .post<StuffWithItems>(apiUrl, {
        stuffId,
      })
      .then((response) => resolve(new StuffWithItems(response.data)))
      .catch(handleError(reject));
  });
}

export function getAllHistoryInDept(userToken: string, deptId: string) {
  const apiUrl = `histories?department-id=${deptId}`;

  return new Promise<List<History>>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
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

export function getAllRequesterHistoryInDept(userToken: string, deptId: string, userId: string) {
  const apiUrl = `histories?department-id=${deptId}&requester-id=${userId}`;

  return new Promise<List<History>>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
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

export function getHistory(userToken: string, historyId: string) {
  const apiUrl = `histories/${historyId}`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .get<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function rentStuff(userToken: string, stuffId: string) {
  const apiUrl = `stuffs/${stuffId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function rentItem(userToken: string, itemId: string) {
  const apiUrl = `items/${itemId}/reserve`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function reportLostItem(userToken: string, itemId: string) {
  const apiUrl = `items/${itemId}/lost`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function approveItem(userToken: string, itemId: string) {
  const apiUrl = `items/${itemId}/approve`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function returnItem(userToken: string, itemId: string) {
  const apiUrl = `items/${itemId}/return`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}

export function cancelItem(userToken: string, itemId: string) {
  const apiUrl = `items/${itemId}/cancel`;

  return new Promise<History>((resolve, reject) => {
    axios
      .create({
        ...API_SERVER_INSTANCE_CONFIG,
        headers: { 'user-token': userToken },
      })
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch(handleError(reject));
  });
}
