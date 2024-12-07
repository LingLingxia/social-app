import userModel from '@/models/Users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username:userName , email, password } = await req.json();

  if (userName && email && password) {
    
    const existingUser = await userModel.findOne({
      $or:[{userName},{email}]
    })
    if(existingUser){
      return NextResponse.json({message:'User Exist'},{ status: 400})
    }
    //todo: hash the password
    await new userModel({userName,email,password}).save()
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } else {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
}