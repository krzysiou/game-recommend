import type { Game, User, GameBundle } from '../../types';

import { query } from '../query';

const getGamesParameters = (records) => {
  const result: GameBundle[] = records.map((record) => {
    const author: User = record.get('user').properties;
    const game: Game = record.get('game').properties;

    return { author, game };
  });

  return result;
};
const getGames = async () => {
  const result = await query(
    `MATCH (user:User)-[:ADDED]->(game:Game) RETURN user, game`
  );

  if (result.records.length === 0) {
    return undefined;
  }

  return getGamesParameters(result.records);
};

export { getGames };
