import type { UserWithSecureInfo } from "@common/types/Models";

const userDummy: UserWithSecureInfo = {
  university: {
    code: "DEV",
    name: "DEV"
  },
  studentId: "DEV3",
  name: "개발자1",
  authorities: [
    {
      department: {
        university: {
          code: "DEV",
          name: "DEV"
        },
        code: "DEV",
        name: "DEV",
        baseMajors: []
      },
      permission: "DEVELOPER"
    }
  ],
  token: "2aa35846-913a-47b5-ac44-b47a9481f2fa",
  createdAt: 1680146837,
  approvedAt: 1680146837
};
export default userDummy;
