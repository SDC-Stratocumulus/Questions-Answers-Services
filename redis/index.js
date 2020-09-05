const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient({
  host: 'cache',
  port: REDIS_PORT,
});

module.exports = client;
