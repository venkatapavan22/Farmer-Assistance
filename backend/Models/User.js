import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    country:{
        type:String,
    },
    cityState:{
        type:String,
    },
    postalCode:{
        type:String,
    },
    image:{
        type:String,
    }
})

const User = mongoose.model('User',userSchema);
export default User;