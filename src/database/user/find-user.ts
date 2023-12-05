import type { User } from '../../types';

import { query } from '../query';

type FindUserParams = {
  id?: string;
  username?: string;
};

const getUserParameters = (record) => {
  const user: User = record.get('user').properties;

  return user;
};

const findUser = async ({ id, username }: FindUserParams) => {
  if (id) {
    const result = await query<User>(
      `MATCH (user:User {id: '${id}'}) RETURN user`
    );

    if (result.records.length === 0) {
      return undefined;
    }

    return getUserParameters(result.records[0]);
  } else if (username) {
    const result = await query<User>(
      `MATCH (user:User {username: '${username}'}) RETURN user`
    );

    if (result.records.length === 0) {
      return undefined;
    }

    return getUserParameters(result.records[0]);
  }

  return null;
};

export { findUser };
