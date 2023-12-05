import neo4j from 'neo4j-driver';

import { config } from '../config/config';

const {
  database: { username, password, connectionUrl },
} = config;

const auth = neo4j.auth.basic(username, password);
const driver = neo4j.driver(connectionUrl, auth);

export { driver };
