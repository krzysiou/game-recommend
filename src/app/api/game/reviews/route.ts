import { NextResponse } from 'next/server';

import { getComments } from '../../../../database/game/get-comments';

export const dynamic = 'force-dynamic';

type Payload = {
  id: string;
};

export async function POST(request: Request) {
  const { id } = (await request.json()) as Payload;

  const data = await getComments(id);

  if (!data) {
    return NextResponse.json(
      { message: 'No games were found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
