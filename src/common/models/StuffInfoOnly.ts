import BaseVo from '@common/models/BaseVo';

export interface IStuffInfoOnly {
  id: string;
  name: string;
  thumbnail: string;
}

export class StuffInfoOnly extends BaseVo {
  public static NIL: StuffInfoOnly = new StuffInfoOnly({
    id: '',
    name: '',
    thumbnail: '',
  });

  public id: string;

  public name: string;

  public thumbnail: string;

  constructor(oth: IStuffInfoOnly) {
    super();
    this.id = oth.id;
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof StuffInfoOnly)) return false;
    return this.id === oth.id && this.name === oth.name && this.thumbnail === oth.thumbnail;
  }
}

export default StuffInfoOnly;
