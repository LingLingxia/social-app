import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    // const url = new URL(req.url);
    // const id = url.searchParams.get("id");
    const list = [];
    for(let i = 0;i<10;i++){
        list.push( {
            id:i,
            title:"Title "+i,
            message:"message " + i,
            picture:null,
            likeCount:5 + i,
            commentsCount:2 +i
        })
    }
    return NextResponse.json({ list }, { status: 201 });

}