import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import User from "../model/user.model.js"
import createError from "../helper/apiError.js";
import asyncHandler from "express-async-handler";
import { Validator } from "node-input-validator";
import redis from "../../app/config/redis.config.js";
import mongoose from "mongoose";

const createCategory = asyncHandler(async (req, res) => {
  const v = new Validator(req.body, {
    name: "required|string|minLength:3|maxLength:40",
  });

  const matched = v.check();
  if (!matched) {
    throw createError(400, v.errors);
  }

  const { name } = req.body;
  if (!name) throw createError(400, "Empty Category name!");
  const isExist = await Category.findOne({ name });
  if (isExist) throw createError(400, "Category is already exists...");

  const newCategory = new Category({ name: name.toLowerCase() });
  await newCategory.save();
  return res.status(200).json({
    message: "Category added successfully...",
    newCategory,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const v = new Validator(req.body, {
    name: "required|string|minLength:3|maxLength:50",
    quantity: "required|numeric",
    price: "required|numeric",
    category: "required|string|regex:^[0-9a-fA-F]{24}$",
    subCategory: "required|string|regex:^[0-9a-fA-F]{24}$",
  });

  const matched = v.check();

  if (!matched) {
    throw createError(400, v.errors);
  }

  const { name, quantity, price, category, subCategory } = req.body;

  const isExist = await Product.findOne({ name });
  if (isExist) {
    throw createError(400, "Product already exists...");
  }

  const categoryId = new mongoose.Types.ObjectId(category);
  const subCategoryId = new mongoose.Types.ObjectId(subCategory);

  const isCategoryExist = await Category.findOne({ _id: categoryId });
  const isSubCategoryExist = await Category.findOne({ _id: subCategoryId });

  if (!isCategoryExist || !isSubCategoryExist) {
    return createError(400, "Category or Subcategory does not exist...");
  }

  const newProduct = new Product({
    name,
    quantity,
    price,
    category,
    subCategory,
  });
  await newProduct.save();
  console.log("Product added successfully...");
  return res.status(200).json({
    message: "New product added successfully...",
    newProduct,
  });
});

const getProduct = asyncHandler(async (req, res) => {
    const cacheKey = `product:${req.params.id}`;

  const productId = req.params.id;
  
  const product = await Product.findById(productId).lean();

  if (!product) {
    throw createError(404, "Product not found");
  }
  
  res.status(200).json(product);

  await redis.set(cacheKey, JSON.stringify(product), "EX", 3600);
  console.log("Data fetched from MongoDb and cachedin Redis");
  return
});

const updateProduct = asyncHandler(async (req, res) => {
  const v = new Validator(req.body, {
    name: "required|string|minLength:3|maxLength:50",
    quantity: "required|numeric",
    price: "required|numeric",
    category: "required|string|regex:^[0-9a-fA-F]{24}$",
    subCategory: "required|string|regex:^[0-9a-fA-F]{24}$",
  });

  const matched = v.check();
  if (!matched) {
    throw createError(400, v.errors);
  }

  const cacheKey = req.originalUrl;
  const productId = req.params.id;
  const updateData = req.body;

  const updateProduct = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
  });

  if (!updateProduct) {
    return res.status(404).json({
      message: "Product to update not found",
    });
  }

  await redis.del(cacheKey);
  console.log("Databas4e update and cache invalidated.");

  await redis.del("/api/v1/products");

  return res.status(200).json(updateProduct);
});

const assingProductToUser = asyncHandler(async (req, res) =>{

  const user = await User.findById(req.params.id)
  if(!user){
    throw createError(404,"User not found")
  }

  const product = await Product.findById(req.params?.productId)
  if(!product){
    throw createError(404,"Product not found")
  }

  user.assignedProducts.push(product._id)
  await user.save()
  return res.status(200).json(user)
})

const produtController = {
  createCategory,
  createProduct,
  getProduct,
  updateProduct,
  assingProductToUser
};

export default produtController;
