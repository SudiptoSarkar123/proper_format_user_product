import redis from "../config/redis.config.js";

const redisMiddleware = async (req,res,next) =>{
    const cacheKey = `product:${req.params.id}`;
    // console.log(cacheKey)
    const cachedProduct = await redis.get(cacheKey)
    if(cachedProduct){
        console.log('Data served from redis ceche')
        return res.status(200).json(JSON.parse(cachedProduct))            
    }    
    next();
}

export default redisMiddleware