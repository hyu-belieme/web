import type University from "@/models/university/University";
import type LoginInfo from "@/models/user/LoginInfo";

export default interface User {
  university: University;
  studentId: string;
  name: string;
  entranceYear?: number;
  loginInfo?: LoginInfo;
}
