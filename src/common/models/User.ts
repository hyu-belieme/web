import University from '@common/models/University';

class User {
  public id: string;

  public university: University;

  public studentId: string;

  public name: string;

  public entranceYear?: number;

  constructor(oth: User) {
    this.id = oth.id;
    this.university = new University(oth.university);
    this.studentId = oth.studentId;
    this.name = oth.name;
    this.entranceYear = oth.entranceYear;
  }
}

export default User;
