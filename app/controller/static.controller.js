// import createError  from "../helper/apiError.js";  
import asyncHandler from "express-async-handler";


const loginPg = asyncHandler(async (req, res) => {
    res.render("Auth/login");
});

const registerPg = asyncHandler(async(req,res)=>{
    res.render("Auth/register")
})

const productList = asyncHandler(async(req,res)=>{
    res.render("ProductPage/productList")
})


const staticController = {
    loginPg
    ,registerPg,
    productList
}
export default staticController