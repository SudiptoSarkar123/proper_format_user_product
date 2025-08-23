import mongoose, { mongo } from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{type:String,unique:true},
    quantity:{type:Number},
    price:{type:Number},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"
    },
    subCategory:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    isActive:{type:Boolean,default:true},
    image:{type:String},
})

const productModel = mongoose.model("Product",productSchema)

export default productModel 