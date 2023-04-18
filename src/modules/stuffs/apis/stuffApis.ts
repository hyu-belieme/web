import serverApi from "@common/apis/beliemeApiInstance";

export const getAllStuffsInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return await serverApi().get(apiUrl);
};

export const getStuff = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}`;

  return await serverApi().get(apiUrl);
};

export const rentStuff = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/reserve`;

  return await serverApi().patch(apiUrl);
};

export const rentItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/reserve`;

  return await serverApi().patch(apiUrl);
};

export const reportLostItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/lost`;

  return await serverApi().patch(apiUrl);
};

export const returnItem = async (
  univCode: string,
  deptCode: string,
  stuffCode: string,
  itemNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}/items/${itemNum}/return`;

  return await serverApi().patch(apiUrl);
};
