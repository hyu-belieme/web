import BaseVo from '@common/models/BaseVo';

export interface IStuffRequestBody {
  name: string;
  thumbnail: string;
  desc: string;
}

export class StuffRequestBody extends BaseVo {
  public name: string;

  public thumbnail: string;

  public desc: string;

  constructor(oth: IStuffRequestBody) {
    super();
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
    this.desc = oth.desc;
  }

  public equals(oth: any): boolean {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof StuffRequestBody)) return false;
    return this.name === oth.name && this.thumbnail === oth.thumbnail && this.desc === oth.desc;
  }
}

export default StuffRequestBody;
