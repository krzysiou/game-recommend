import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import { createUser } from '../../../../database/user/create-user';
import { findUser } from '../../../../database/user/find-user';
import { generateJWT, getExpireDate } from '../../../../utils/jwt-token';

type Payload = {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as Payload;

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Provide all information' },
      { status: 400 }
    );
  }

  const id = uuid();

  const user = {
    id,
    username,
    password,
  };

  const foundUser = await findUser({ username });

  if (foundUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  await createUser(user);

  const accessToken = generateJWT(user);
  const expire = getExpireDate();

  const data = {
    id,
    accessToken,
    expire,
  };

  return NextResponse.json(data, { status: 200 });
}
