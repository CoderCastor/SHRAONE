import { createClient } from "redis";

const client = createClient();

try {
  await client.connect();
  console.log("Connected to Redis");
} catch (error) {
  console.error("Failed to connect to Redis", error);
}

export { client };
