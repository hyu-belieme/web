class University {
  public id: string;

  public name: string;

  constructor(oth: University) {
    this.id = oth.id;
    this.name = oth.name;
  }
}

export default University;
