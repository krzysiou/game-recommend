import type { User } from '../../types';

import { query } from '../query';

const createUser = async (user: User) => {
  const { id, username, password } = user;

  await query(
    `CREATE (:User {id: '${id}', username: '${username}', password: '${password}'})`
  );
};

export { createUser };
