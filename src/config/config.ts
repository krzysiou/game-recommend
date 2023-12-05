import type { Config } from './types';

const config: Config = {
  hostname: process.env.NEXT_PUBLIC_HOSTNAME,
  tokenSecret: process.env.TOKEN_SECRET,
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectionUrl: process.env.DB_CONNECTION_URL,
  },
};

export { config };
