import type { Config } from './types';

const config: Config = {
  tokenSecret: process.env.TOKEN_SECRET,
};

export { config };
