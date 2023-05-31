import User from '@common/models/User';

class UserWithSecureInfo extends User {
  public token: string;

  public createdAt: number;

  public approvedAt: number;

  constructor(oth: UserWithSecureInfo) {
    super(oth);
    this.token = oth.token;
    this.createdAt = oth.createdAt;
    this.approvedAt = oth.approvedAt;
  }
}

export default UserWithSecureInfo;
