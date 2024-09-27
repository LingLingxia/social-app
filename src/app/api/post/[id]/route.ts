import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  return NextResponse.json({ message: `Fetching post with ID: ${id}` });
}