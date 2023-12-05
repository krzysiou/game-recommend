import { databaseClient } from './database-client';

const query = async <T>(content: string) => {
  const data = await databaseClient.run<T>(content);

  return data;
};

export { query };
