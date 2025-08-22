import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, unique:true},
    password:{type:String,unique:true},
    assignedProducts:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    dob:{type:Date},
    phone:{type:Number},
    isActive:{type:Boolean,default:false},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role'}
})

const userModel  = mongoose.model('User',UserSchema)

export default userModel

