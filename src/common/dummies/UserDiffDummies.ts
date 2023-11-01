import { List } from 'immutable';

import type { IAuthority } from '@common/models/Authority';

import { type IUserDiff, UserDiff } from '@^users/models/UserDiff';

const userDiffDummies: IUserDiff[] = [
  {
    user: {
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
    dept: {
      id: '35334234-3731-4231-4545-304134383143',
      university: {
        id: '37364342-4345-3342-4143-344334433445',
        name: '한양대학교',
      },
      name: '컴퓨터 소프트웨어학부',
      baseMajors: List(['FH04067', 'FH04068']),
    },
    prevState: 'USER',
    curState: 'STAFF',
  },
];

export default userDiffDummies.map((userDiff) => new UserDiff(userDiff));
