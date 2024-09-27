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

//transfer this api as a auth api
export async function POST(req: Request) {
    try{
        const data = await req.json();
    
        const { title, description,image} = data;
        return NextResponse.json({ 
            message:"Post created successfully",
            data:{
                title,
                description,
                image
            }
         }, { status: 200 });
    } catch (error) {
        console.error('Error parsing request:', error);
        return NextResponse.json(
            { error: 'Failed to parse request' },
            { status: 400 }
        );
    }
 

}