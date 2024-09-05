import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ message: 'POST request to /api/test successful' }, { status: 200 });
}


  