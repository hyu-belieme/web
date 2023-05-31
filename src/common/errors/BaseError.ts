class BaseError {
  public name: string;

  public message: string;

  constructor(oth: BaseError) {
    this.name = oth.name;
    this.message = oth.message;
  }
}

export default BaseError;
