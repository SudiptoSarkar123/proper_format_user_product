import redis from "../config/redis.config.js";
const redisAllProductsMiddleware = async (req,res,next)=>{
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cachedProducts = await redis.get(cacheKey);

    if(cachedProducts){
        console.log("Data served from Redis cache");
        return res.status(200).json(JSON.parse(cachedProducts));
    }
    req.cacheKey = cacheKey
    next();
}


export default redisAllProductsMiddleware