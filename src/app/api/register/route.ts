import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import { generateJWT, getExpireDate } from '../../../utils/jwt-token';

type Payload = {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as Payload;

  const id = uuid();

  const user = {
    id,
    username,
    password,
  };

  // save user in database

  const accessToken = generateJWT(user);

  const expire = getExpireDate();

  const data = {
    id,
    accessToken,
    expire,
  };

  return NextResponse.json(data, { status: 200 });
}
