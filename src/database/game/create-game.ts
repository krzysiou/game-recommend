import type { Game, User } from '../../types';

import { query } from '../query';

const createGame = async (user: User, game: Game) => {
  const { id: userId } = user;
  const { id: gameId, title, description } = game;

  await query(
    `CREATE (game:Game {id: '${gameId}', title: '${title}', description: '${description}'})`
  );

  await query(
    `MATCH (user:User {id: '${userId}'}) MATCH (game:Game {id: '${gameId}'}) CREATE (user)-[:ADDED]->(game) RETURN user, game`
  );
};

export { createGame };
