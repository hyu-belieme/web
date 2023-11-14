import { List } from 'immutable';

import { Authority } from '@common/models/Authority';
import User from '@common/models/User';

import type UserDiff from '@^users/models/UserDiff';

function applyUserDiff(user: User | undefined, userDiff: UserDiff) {
  const targetUser = user || userDiff.user;
  let newAuthorities = targetUser.authorities.filter(
    (auth) => auth.department.id !== userDiff.dept.id
  );

  if (userDiff.curState === 'BANNED') {
    newAuthorities = List<Authority>([]);
  } else {
    newAuthorities = newAuthorities.push(
      new Authority({
        department: userDiff.dept,
        permission: userDiff.curState,
      })
    );
  }

  return new User({
    ...targetUser,
    authorities: newAuthorities,
  });
}

function applyUserDiffs(users: User[], userDiffs: UserDiff[]) {
  const userMap: Map<string, User> = new Map();
  users.forEach((user) => userMap.set(user.id, new User(user)));

  userDiffs.forEach((userDiff) => {
    const newUser = applyUserDiff(userMap.get(userDiff.user.id), userDiff);
    if (newUser.authorities.size === 0) userMap.delete(newUser.id);
    else userMap.set(newUser.id, newUser);
  });
  return Array.from(userMap.values());
}

export default applyUserDiffs;
