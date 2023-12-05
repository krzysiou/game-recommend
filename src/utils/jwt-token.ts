import { headers } from 'next/headers';
import { sign, verify } from 'jsonwebtoken';

import type { User } from '../types';

import { config } from '../config/config';

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

const decodeUser = () => {
  const headersList = headers();
  const accessToken = headersList.get('authorization').split(' ')[1] as string;
  if (!accessToken) {
    return false;
  }

  const user = verifyJWT(accessToken);

  return user;
};

const getExpireDate = () => {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
};

export { getExpireDate, generateJWT, verifyJWT, decodeUser };
