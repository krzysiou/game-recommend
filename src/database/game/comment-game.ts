import type { Game, User } from '../../types';

import { query } from '../query';

const commentGame = async (comment: string, user: User, game: Game) => {
  const { id: userId } = user;
  const { id: gameId } = game;

  await query(
    `MATCH (user:User {id: '${userId}'}) MATCH (game:Game {id: '${gameId}'}) CREATE (user)-[c:COMMENTED]->(game) SET c.comment = '${comment}' RETURN user, game`
  );
};

export { commentGame };
