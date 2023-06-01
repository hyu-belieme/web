import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';

const userDummy: UserWithSecureInfo = {
  id: '31383941-3930-3237-3036-464534333241',
  university: {
    id: '34453032-3531-3342-4643-444434464445',
    name: 'DEV',
  },
  studentId: 'DEV3',
  name: '개발자3',
  authorities: [
    {
      department: {
        id: '37434636-4339-3345-3946-313634443633',
        university: {
          id: '34453032-3531-3342-4643-444434464445',
          name: 'DEV',
        },
        name: 'DEV',
        baseMajors: [],
      },
      permission: 'DEVELOPER',
    },
  ],
  token: '333abb96-bd0a-4b01-9d82-d7b0febf233c',
  createdAt: 1684257934,
  approvedAt: 1684258466,
};
export default userDummy;
