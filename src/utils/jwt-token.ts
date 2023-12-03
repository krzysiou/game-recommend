import { sign, verify } from 'jsonwebtoken';

import { config } from '../config/config';
type User = {
  id: string;
  username: string;
  password: string;
};

const generateJWT = (user: User) => {
  const { tokenSecret } = config;

  return sign(user, tokenSecret);
};

const verifyJWT = (token: string) => {
  const { tokenSecret } = config;

  try {
    return verify(token, tokenSecret) as User;
  } catch (error) {
    return false;
  }
};

const getExpireDate = () => {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
};

export { getExpireDate, generateJWT, verifyJWT };
