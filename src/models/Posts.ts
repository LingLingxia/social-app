import mongoose from "mongoose"
const PostModel = mongoose.models.posts ||   mongoose.model("posts",new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:false,
    },
    likeCount:{
        type:Number,
        required:true,
    },
    commentsCount:{
        type:Number,
        required:true,
    }
}))

export default PostModel