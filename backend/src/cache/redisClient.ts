import { createClient } from "redis";

// use default config settings of localhost and port 6379
// would provide more detailed connection config object using env variables for production
const client = createClient({
  url: `redis://redis:6379`,
});

// log successful connection
client.on("connect", () => {
  console.log("Connected to Redis");
});

// type narrowing for error object
client.on("error", (err) => {
  if (err instanceof Error) {
    console.error("Redis error:", err);
  }
});

// connect to Redis cache
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log("Redis error on connection: ", err);
  }
})();

// export connected client for use by services
export default client;
