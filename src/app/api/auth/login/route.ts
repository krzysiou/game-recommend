import { NextResponse } from 'next/server';

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

  const foundUser = await findUser({ username });

  if (!foundUser) {
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 404 }
    );
  }

  if (foundUser.password !== password) {
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 401 }
    );
  }

  const accessToken = generateJWT(foundUser);
  const expire = getExpireDate();

  const data = {
    id: foundUser.id,
    accessToken,
    expire,
  };

  return NextResponse.json(data, { status: 200 });
}
