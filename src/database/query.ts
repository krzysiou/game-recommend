import { driver } from './database-driver';

const query = async <T>(content: string) => {
  const data = await driver.session().run<T>(content);

  return data;
};

export { query };
