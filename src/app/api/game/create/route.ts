import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

import type { Game } from '../../../../types';

import { decodeUser } from '../../../../utils/jwt-token';
import { createGame } from '../../../../database/game/create-game';

type Payload = {
  title: string;
  description: string;
};

export async function POST(request: Request) {
  const user = decodeUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description } = (await request.json()) as Payload;

  if (!title || !description) {
    return NextResponse.json(
      { message: 'Provide all information' },
      { status: 400 }
    );
  }
  const id = uuid();

  const game: Game = {
    id,
    title,
    description,
  };

  await createGame(user, game);

  return NextResponse.json({ status: 200 });
}
