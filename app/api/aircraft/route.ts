import { NextRequest, NextResponse } from 'next/server';
import { AIRCRAFT_DATABASE } from '@/data/aircraft';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    const aircraft = AIRCRAFT_DATABASE[code.toUpperCase()];
    if (!aircraft) {
      return NextResponse.json({ error: 'Aircraft not found' }, { status: 404 });
    }
    return NextResponse.json(aircraft);
  }

  return NextResponse.json({
    total: Object.keys(AIRCRAFT_DATABASE).length,
    aircraft: Object.values(AIRCRAFT_DATABASE)
  });
}
