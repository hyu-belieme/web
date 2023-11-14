import { List } from 'immutable';

import type { IAuthority } from '@common/models/Authority';
import { type IUser, User } from '@common/models/User';

const userDummies: IUser[] = [
  {
    id: '41453234-3543-4337-4238-353234364432',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2018008886',
    name: '이석환',
    entranceYear: 2018,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '12345678-1234-5678-1234-567812345678',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2021005678',
    name: '박예진',
    entranceYear: 2021,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '12345678-1234-5678-1234-567812345678',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2021005678',
    name: '박예진',
    entranceYear: 2021,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '98765432-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2019008765',
    name: '김예지',
    entranceYear: 2019,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '34561234-1234-5678-1234-567812345678',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2020005432',
    name: '이예원',
    entranceYear: 2020,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '65431234-1234-5678-1234-567812345678',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2017004321',
    name: '정예현',
    entranceYear: 2017,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '76543212-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2016007654',
    name: '최예린',
    entranceYear: 2016,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '54329876-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2015001098',
    name: '김예송',
    entranceYear: 2015,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '87654321-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2014006543',
    name: '이예솔',
    entranceYear: 2014,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '43219876-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2013009876',
    name: '박예환',
    entranceYear: 2013,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '32109876-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2012008765',
    name: '김예환',
    entranceYear: 2012,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '21098765-8765-4321-8765-4321987654321',
    university: {
      id: '37364342-4345-3342-4143-344334433445',
      name: '한양대학교',
    },
    studentId: '2011004321',
    name: '정예영',
    entranceYear: 2011,
    authorities: List<IAuthority>([
      {
        department: {
          id: '35334234-3731-4231-4545-304134383143',
          university: {
            id: '37364342-4345-3342-4143-344334433445',
            name: '한양대학교',
          },
          name: '컴퓨터 소프트웨어학부',
          baseMajors: List(['FH04067', 'FH04068']),
        },
        permission: 'USER',
      },
    ]),
  },
  {
    id: '38433142-3134-3231-3741-384234424539',
    university: {
      id: '34453032-3531-3342-4643-444434464445',
      name: 'DEV',
    },
    studentId: 'DEV1',
    name: '개발자1',
    authorities: List<IAuthority>([
      {
        department: {
          id: '37434636-4339-3345-3946-313634443633',
          university: {
            id: '34453032-3531-3342-4643-444434464445',
            name: 'DEV',
          },
          name: 'DEV',
          baseMajors: List([]),
        },
        permission: 'DEVELOPER',
      },
    ]),
  },
  {
    id: '31313446-4336-3943-3136-453534334641',
    university: {
      id: '34453032-3531-3342-4643-444434464445',
      name: 'DEV',
    },
    studentId: 'DEV2',
    name: '개발자2',
    authorities: List<IAuthority>([
      {
        department: {
          id: '37434636-4339-3345-3946-313634443633',
          university: {
            id: '34453032-3531-3342-4643-444434464445',
            name: 'DEV',
          },
          name: 'DEV',
          baseMajors: List([]),
        },
        permission: 'DEVELOPER',
      },
    ]),
  },
  {
    id: '31383941-3930-3237-3036-464534333241',
    university: {
      id: '34453032-3531-3342-4643-444434464445',
      name: 'DEV',
    },
    studentId: 'DEV3',
    name: '개발자3',
    authorities: List<IAuthority>([
      {
        department: {
          id: '37434636-4339-3345-3946-313634443633',
          university: {
            id: '34453032-3531-3342-4643-444434464445',
            name: 'DEV',
          },
          name: 'DEV',
          baseMajors: List([]),
        },
        permission: 'DEVELOPER',
      },
    ]),
  },
];

export default userDummies.map((user) => new User(user));
