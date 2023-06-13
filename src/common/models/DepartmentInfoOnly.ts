import { List } from 'immutable';

import BaseVo from '@common/models/BaseVo';

export interface IDepartmentInfoOnly {
  id: string;

  name: string;

  baseMajors: List<string>;
}
export class DepartmentInfoOnly extends BaseVo {
  public static NIL: DepartmentInfoOnly = new DepartmentInfoOnly({
    id: '',
    name: '',
    baseMajors: List<string>([]),
  });

  public id: string;

  public name: string;

  public baseMajors: List<string>;

  constructor(oth: IDepartmentInfoOnly) {
    super();
    this.id = oth.id;
    this.name = oth.name;
    this.baseMajors = List<string>(oth.baseMajors);
  }

  public equals(oth: any) {
    if (oth === undefined || oth === null) return false;
    if (!(oth instanceof DepartmentInfoOnly)) return false;
    return (
      this.id === oth.id &&
      this.name === oth.name &&
      this.baseMajors.reduce(
        (acc, val, idx) => acc && val === oth.baseMajors.get(idx),
        this.baseMajors.size === oth.baseMajors.size
      )
    );
  }
}

export default DepartmentInfoOnly;
