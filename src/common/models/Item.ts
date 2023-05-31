import ItemInfoOnly from '@common/models/ItemInfoOnly';
import StuffInfoOnly from '@common/models/StuffInfoOnly';

class Item extends ItemInfoOnly {
  public stuff: StuffInfoOnly;

  constructor(oth: Item) {
    super(oth);
    this.stuff = new StuffInfoOnly(oth.stuff);
  }
}

export default Item;
