import mongoose from 'mongoose'


const ctegorySchem = new mongoose.Schema({
    name:{type:String,unique:true},
    isActive:{type:Boolean,default:true},
})


const categoryModel = mongoose.model("Category",ctegorySchem)
export default categoryModel ;