// const Redis = require("ioredis");
import Redis from 'ioredis'
// const axios = require("axios");
const redis = new Redis({
  port: 18150, // Redis port
  host: "redis-18150.c93.us-east-1-3.ec2.redns.redis-cloud.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "A6igPlZQkyPRw9qFunxUYkpOpCNvGs4p",
  db: 0, 
});

export default redis