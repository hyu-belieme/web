export interface IUniversity {
  id: string;
  name: string;
}

export class University {
  public static NIL: University = new University({
    id: '',
    name: '',
  });

  public id: string;

  public name: string;

  constructor(oth: IUniversity) {
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
