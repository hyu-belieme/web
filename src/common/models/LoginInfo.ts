class LoginInfo {
  public token: string;

  public createdAt: number;

  public approvedAt: number;

  constructor(oth: LoginInfo) {
    this.token = oth.token;
    this.createdAt = oth.createdAt;
    this.approvedAt = oth.approvedAt;
  }
}

export default LoginInfo;
