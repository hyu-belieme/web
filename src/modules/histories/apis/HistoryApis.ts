import serverApi from "@common/apis/beliemeApiInstance";

export const getAllHistoryInDept = async (univCode: string, deptCode: string) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/histories`;

  return await serverApi().get(apiUrl);
};

export const getAllRequesterHistoryInDept = async (
  univCode: string,
  deptCode: string,
  requesterUnivCode: string,
  requesterStudentId: string
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/histories?requester-university-code=${requesterUnivCode}&requester-student-id=${requesterStudentId}`;

  return await serverApi().get(apiUrl);
};

export const getHistory = async (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  var apiUrl = `universities/${univCode}/departments/${deptCode}/stuffs/${stuffName}/items/${itemNum}/histories/${historyNum}`;

  return await serverApi().get(apiUrl);
};
