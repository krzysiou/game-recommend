import { NextResponse } from 'next/server';

import type { Game } from '../../../../types';

import { decodeUser } from '../../../../utils/jwt-token';
import { commentGame } from '../../../../database/game/comment-game';

type Payload = {
  comment: string;
  game: Game;
};

export async function POST(request: Request) {
  const user = decodeUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { comment, game } = (await request.json()) as Payload;

  if (!comment) {
    return NextResponse.json(
      { message: 'Provide all information' },
      { status: 400 }
    );
  }

  await commentGame(comment, user, game);

  return NextResponse.json({ status: 200 });
}
