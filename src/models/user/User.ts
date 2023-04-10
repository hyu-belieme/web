import type University from "@/models/university/University";
import type LoginInfo from "@/models/user/LoginInfo";

export default class User {
  constructor(
    university: University,
    studentId: String,
    name: String,
    entranceYear?: number,
    loginInfo?: LoginInfo
  ) {}
}
