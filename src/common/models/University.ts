import BaseVo from '@common/models/BaseVo';

export interface IUniversity {
  id: string;
  name: string;
}

export class University extends BaseVo {
  public static NIL: University = new University({
    id: '',
    name: '',
  });

  public id: string;

  public name: string;

  constructor(oth: IUniversity) {
    super();
    this.id = oth.id;
    this.name = oth.name;
  }

  public equals(oth: any) {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof University)) return false;
    return this.id === oth.id && this.name === oth.name;
  }
}

export default University;
