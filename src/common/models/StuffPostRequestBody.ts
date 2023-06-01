import StuffRequestBody from '@common/models/StuffRequestBody';

class StuffPostRequestBody extends StuffRequestBody {
  public departmentId: string;

  public amount?: number;

  constructor(oth: StuffPostRequestBody) {
    super(oth);
    this.departmentId = oth.departmentId;
    this.amount = oth.amount;
  }
}

export default StuffPostRequestBody;
