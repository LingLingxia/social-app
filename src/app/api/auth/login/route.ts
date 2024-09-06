import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === 'test@abc.com' && password === '1234') {
    return NextResponse.json({ message: 'Login successful', token: 'dummy-token' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}