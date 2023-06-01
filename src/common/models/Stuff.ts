import StuffInfoOnly from '@common/models/StuffInfoOnly';

class Stuff extends StuffInfoOnly {
  public amount: number;

  public count: number;

  constructor(oth: Stuff) {
    super(oth);
    this.amount = oth.amount;
    this.count = oth.count;
  }
}

export default Stuff;
