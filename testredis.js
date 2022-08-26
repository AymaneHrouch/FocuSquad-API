const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.on('connect', function() {
  console.log('Connected!');
});

client.connect();