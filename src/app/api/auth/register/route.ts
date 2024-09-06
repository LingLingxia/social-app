import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (username && email && password) {
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } else {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
}