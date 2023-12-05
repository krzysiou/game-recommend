import type { Game, User } from '../../types';

import { query } from '../query';

const rateGame = async (score: number, user: User, game: Game) => {
  const { id: userId } = user;
  const { id: gameId } = game;

  await query(
    `MATCH (user:User {id: '${userId}'}) MATCH (game:Game {id: '${gameId}'}) MERGE (user)-[r:RATED]->(game) SET r.rating = '${score}' RETURN user, game`
  );
};

export { rateGame };
