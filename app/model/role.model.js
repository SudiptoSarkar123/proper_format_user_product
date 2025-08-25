import mongoose from 'mongoose'


const roleSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    permissions:{type:[String],enum:["write","read","update","delete"]},
    isActive:{type:Boolean,default:true}
})

const roleModel = mongoose.model("Role",roleSchema)
export default roleModel