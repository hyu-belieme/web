import { List } from "immutable";

import serverApi from "@common/apis/beliemeApiInstance";
import { History } from "@common/types/Models";

export const getAllHistoryInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/histories`;

  return new Promise<List<History>>((resolve, reject) => {
    serverApi()
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
    serverApi()
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
    serverApi()
      .get<History>(apiUrl)
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

export const cancelItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/cancel`;

  return new Promise<History>((resolve, reject) => {
    serverApi()
      .patch<History>(apiUrl)
      .then((response) => resolve(new History(response.data)))
      .catch((error) => reject(error));
  });
};
