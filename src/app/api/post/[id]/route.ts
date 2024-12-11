import PostModel from '@/models/Posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try{
    const result = await PostModel.findById(id);
    if(result){
     return NextResponse.json({ data: result });
    }else{
      return NextResponse.json({ message:"Can not find data"})
    }
  }catch(err){
    console.error(err);
    return NextResponse.json({ message:"System error"})
  }
}