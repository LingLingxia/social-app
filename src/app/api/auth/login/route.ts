import userModel from '@/models/Users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, username: userName } = await req.json();
  try {
    const existingUser = await userModel.findOne({ $or: [{userName}, {email}] });
    if (!existingUser) {
      return NextResponse.json({ message: "Can not found user" }, { status: 404 });
    }
    //todo: hash password when compare
    console.log(existingUser,password);
    if (existingUser.password !== password) {
      return NextResponse.json({ message: " Incorrect Password" }, { status: 400 });
    } else {
      //todo: add token
      return NextResponse.json({ message: 'Login successful', token: 'dummy-token' }, { status: 200 });
    }

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

}