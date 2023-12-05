import type { Game } from '../../types';

import { query } from '../query';

type FindGameParams = {
  id?: string;
  title?: string;
};

const getGameParameters = (record) => {
  const game: Game = record.get('game').properties;

  return game;
};

const findUser = async ({ id, title }: FindGameParams) => {
  if (id) {
    const result = await query<Game>(
      `MATCH (game:Game {id: '${id}'}) RETURN game`
    );

    if (result.records.length === 0) {
      return undefined;
    }

    return getGameParameters(result.records[0]);
  } else if (title) {
    const result = await query<Game>(
      `MATCH (game:Game {title: '${title}'}) RETURN game`
    );

    if (result.records.length === 0) {
      return undefined;
    }

    return getGameParameters(result.records[0]);
  }

  return null;
};

export { findUser };
