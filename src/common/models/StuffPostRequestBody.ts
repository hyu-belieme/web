import StuffRequestBody, { type IStuffRequestBody } from '@common/models/StuffRequestBody';

export interface IStuffPostRequestBody extends IStuffRequestBody {
  departmentId: string;
  amount?: number;
}

export class StuffPostRequestBody extends StuffRequestBody {
  public departmentId: string;

  public amount?: number;

  constructor(oth: IStuffPostRequestBody) {
    super(oth);
    this.departmentId = oth.departmentId;
    this.amount = oth.amount;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof StuffPostRequestBody)) return false;
    return (
      super.equals(oth) && this.departmentId === oth.departmentId && this.amount === oth.amount
    );
  }
}

export default StuffPostRequestBody;
