class StuffInfoOnly {
  public static NIL: StuffInfoOnly = {
    id: '',
    name: '',
    thumbnail: '',
  };

  public id: string;

  public name: string;

  public thumbnail: string;

  constructor(oth: StuffInfoOnly) {
    this.id = oth.id;
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
  }
}

export default StuffInfoOnly;
