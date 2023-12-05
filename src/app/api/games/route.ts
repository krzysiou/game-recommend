import { NextResponse } from 'next/server';

import { getGames } from '../../../database/game/get-games';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getGames();

  if (!data) {
    return NextResponse.json(
      { message: 'No games were found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
