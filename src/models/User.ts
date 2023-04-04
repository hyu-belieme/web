import type { University } from "@/models/University";

class User {
  constructor(
    university: University,
    studentId: String,
    name: String,
    entranceYear?: number,
    loginInfo?: LoginInfo
  ) {}
}

class LoginInfo {
  constructor(token: String, createdAt: number, approvedAt: number) {}
}

export type { User, LoginInfo };
