import type { User } from '../../types';

import { query } from '../query';

const getCommentsParameters = (records) => {
  const comments = records.map((record) => {
    const comment = record.get('c').properties.comment as string;
    const user = record.get('user').properties as User;

    return { comment, user };
  });

  return comments;
};

const getComments = async (id: string) => {
  const result = await query(
    `MATCH (game:Game {id: '${id}'}) MATCH (user)-[c:COMMENTED]->(game) RETURN c, user`
  );

  if (result.records.length === 0) {
    return [];
  }

  return getCommentsParameters(result.records);
};

export { getComments };
