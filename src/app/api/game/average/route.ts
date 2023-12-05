import { NextResponse } from 'next/server';

import { getAverageScore } from '../../../../database/game/get-average-score';

export const dynamic = 'force-dynamic';

type Payload = {
  id: string;
};

export async function POST(request: Request) {
  const { id } = (await request.json()) as Payload;

  const data = await getAverageScore(id);

  if (!data) {
    return NextResponse.json(
      { message: 'No games were found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
