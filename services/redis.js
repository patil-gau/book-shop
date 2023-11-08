const redis = require("redis");
const { promisify } = require("util");

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const RETRY_COUNT = 0;

const client = redis.createClient({
  socket: { host: REDIS_HOST, port: REDIS_PORT },
});

// Promisify Redis client methods
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);

async function connectToRedis() {
  try {
    await client.connect();
  } catch (err) {
    RETRY_COUNT++;
    if (RETRY_COUNT < 5) {
      connectToRedis();
    }
  }
}

//make connection with redis
connectToRedis();

const setKey = async (key, value, expirationSeconds = 30 * 60) => {
  try {
    const serializedValue = JSON.stringify(value);
    await setAsync(key, serializedValue);
    if (expirationSeconds > 0) {
      await expireAsync(key, expirationSeconds);
    }
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

const getKey = async (key) => {
  try {
    const serializedValue = await getAsync(key);
    if (serializedValue) {
      return JSON.parse(serializedValue);
    }
    return null;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

const deleteKey = async (key) => {
  try {
    const reply = await delAsync(key);
    if (reply === 1) {
      console.log("Key deleted");
    } else {
      console.log("Key not found");
    }
  } catch (error) {
    console.error("Redis delete error:", error);
  }
};

module.exports = {
  setKey,
  getKey,
  deleteKey,
};
