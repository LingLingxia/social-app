import PostModel from '@/models/Posts';
import userModel from '@/models/Users';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const list = await PostModel.find()
        return NextResponse.json({ list }, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: "System error" });
    }

    // const list = [];
    // for(let i = 0;i<10;i++){
    //     list.push( {
    //         id:i,
    //         title:"Title "+i,
    //         message:"message " + i,
    //         picture:null,
    //         likeCount:5 + i,
    //         commentsCount:2 +i
    //     })
    // }


}

//transfer this api as a auth api
export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { title, description, image } = data;
        // we use current user to create post ,will update this code when login api done. 

        const user = await userModel.findOne({email:"llxlansing@qq.com"});
        await new PostModel({
            title,
            message: description,
            picture: image,
            userName:user.userName,
            userId:user._id,

        }).save()
        return NextResponse.json({
            message: "Post created successfully",
            data: {
                title,
                description,
                image,

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