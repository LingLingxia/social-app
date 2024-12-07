
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userModel = mongoose.models.users ||  mongoose.model("users",new Schema({
    userName:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,

    },
    password:{
        type:String,
        require: true,
    }
})); 

export default userModel;