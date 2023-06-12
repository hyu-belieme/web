class University {
  public static NIL: University = {
    id: '',
    name: '',
  };

  public id: string;

  public name: string;

  constructor(oth: University) {
    this.id = oth.id;
    this.name = oth.name;
  }
}

export default University;
