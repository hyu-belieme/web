class StuffRequestBody {
  public name: string;

  public thumbnail: string;

  constructor(oth: StuffRequestBody) {
    this.name = oth.name;
    this.thumbnail = oth.thumbnail;
  }
}

export default StuffRequestBody;
