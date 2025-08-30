import redis from "../config/redis.config.js";
import asyncHandler from "express-async-handler";

export const clearProductCache = asyncHandler(async () => {
  const keys = await redis.keys("products:/api/v1/products/*");

  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Cleared ${keys.length} product cache`);
  }
});
