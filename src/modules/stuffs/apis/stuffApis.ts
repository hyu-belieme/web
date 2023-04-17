import serverApi from "@common/apis/beliemeApiInstance";

export const getAllStuffsInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs`;

  return (await serverApi().get(apiUrl)).data;
};

export const getStuff = async (univCode: string, deptCode: string, stuffCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffCode}`;

  return (await serverApi().get(apiUrl)).data;
};
