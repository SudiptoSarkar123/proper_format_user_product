import express from "express";
import authCheck from "../middleware/authCheck.js";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";
import redisDatabase from '../middleware/redis.middleware.js'
const router = express.Router();

router.use("/auth", authRouter);
router.use('/products',redisDatabase,productRouter)





export default router