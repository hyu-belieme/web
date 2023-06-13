import User, { type IUser } from '@common/models/User';

export interface IUserWithSecureInfo extends IUser {
  token: string;
  createdAt: number;
  approvedAt: number;
}

export class UserWithSecureInfo extends User {
  public static NIL: UserWithSecureInfo = new UserWithSecureInfo({
    ...User.NIL,
    token: '',
    createdAt: 0,
    approvedAt: 0,
  });

  public token: string;

  public createdAt: number;

  public approvedAt: number;

  constructor(oth: IUserWithSecureInfo) {
    super(oth);
    this.token = oth.token;
    this.createdAt = oth.createdAt;
    this.approvedAt = oth.approvedAt;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof UserWithSecureInfo)) return false;
    return (
      super.equals(oth) &&
      this.token === oth.token &&
      this.createdAt === oth.createdAt &&
      this.approvedAt === oth.approvedAt
    );
  }
}

export default UserWithSecureInfo;
