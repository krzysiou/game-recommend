import { NextResponse } from 'next/server';

import type { Game } from '../../../../types';

import { decodeUser } from '../../../../utils/jwt-token';
import { rateGame } from '../../../../database/game/rate-game';

type Payload = {
  score: number;
  game: Game;
};

export async function POST(request: Request) {
  const user = decodeUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { score, game } = (await request.json()) as Payload;

  if (!score) {
    return NextResponse.json(
      { message: 'Provide all information' },
      { status: 400 }
    );
  }

  await rateGame(score, user, game);

  return NextResponse.json({ status: 200 });
}
