type Config = {
  hostname: string;
  tokenSecret: string;
  database: {
    username: string;
    password: string;
    connectionUrl: string;
  };
};

export { type Config };
