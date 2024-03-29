import BaseVo from '@common/models/BaseVo';

export interface IStuffInfoOnly {
  id: string;
  name: string;
  thumbnail: string;
  desc: string;
}

export class StuffInfoOnly extends BaseVo {
  public static NIL: StuffInfoOnly = new StuffInfoOnly({
    id: '',
    name: '',
    thumbnail: '',
    desc: '',
  });

  public id: string;

  public name: string;

  public thumbnail: string;

  public desc: string;

  constructor(oth: IStuffInfoOnly) {
    super();
    this.id = oth.id;
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
    this.desc = oth.desc;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof StuffInfoOnly)) return false;
    return (
      this.id === oth.id &&
      this.name === oth.name &&
      this.thumbnail === oth.thumbnail &&
      this.desc === oth.desc
    );
  }
}

export default StuffInfoOnly;
