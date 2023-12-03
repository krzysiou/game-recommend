import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import { generateJWT, getExpireDate } from '../../../utils/jwt-token';

type Payload = {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as Payload;

  // get user from database
  // const user = fetch from database

  // TEMP
  const user = {
    id: uuid(),
    username,
    password,
  };
  // TEMP

  const accessToken = generateJWT(user);

  const expire = getExpireDate();

  const data = {
    id: user.id,
    accessToken,
    expire,
  };

  return NextResponse.json(data, { status: 200 });
}
