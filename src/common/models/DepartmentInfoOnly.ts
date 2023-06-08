import type { List } from 'immutable';

class DepartmentInfoOnly {
  public id: string;

  public name: string;

  public baseMajors: List<string>;

  constructor(oth: DepartmentInfoOnly) {
    this.id = oth.id;
    this.name = oth.name;
    this.baseMajors = oth.baseMajors;
  }
}

export default DepartmentInfoOnly;
