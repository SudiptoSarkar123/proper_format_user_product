//
import User from "../model/user.model.js";
import Role from "../model/role.model.js";
import createError from "../helper/apiError.js";
import bcrypt, { hash } from "bcryptjs";
import asyncHandler from "express-async-handler";
import compaerPass from "../helper/comparePassword.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw createError(400, "All fields are required");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw createError(400, "User already exist");
  }

  const roleId = await Role.findOne({ name: "user" }).select("_id");
  if (!roleId) {
    throw createError(400, "Something went wrong...");
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
    role: roleId,
  });
  res.status(201).json({
    message: "User created successfully",
    user: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createError(400, "All filds are required.");
  }

  const userArr = await User.aggregate([
    {
      $match: { email },
    },
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },
  ]);
  const user = userArr[0];
  console.log(user);
  if (user.length === 0) {
    throw createError(400, "Invalid User.");
  }

  const isMatch = await compaerPass(password, user.password);
  if (!isMatch) {
    throw createError(400, "Password is not match..");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    message: "User logged in successfully",
    token,
  });
});

const createRoll = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;
  const isExist = await Role.findOne({ name });
  if (isExist) {
    throw createError(400, "Role already exist");
  }
  const role = await Role.create({ name, permissions });
  return res.status(201).json({
    message: "Role created successfully",
    role,
  });
});

const authController = {
  register,
  login,
  createRoll,
};
export default authController;
