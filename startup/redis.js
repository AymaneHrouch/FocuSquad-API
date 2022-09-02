const redis = require("redis");
const config = require("config");


const redisClient = redis.createClient({
  socket: {
    host: config.get('redis.host'),
    port: config.get('redis.port'),
  },
  password: config.get('redis.password'),
});

redisClient.on("connect", () => {
  console.log("connected to redis");
});

module.exports = redisClient;
