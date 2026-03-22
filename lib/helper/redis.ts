import { createClient } from "redis";

const client = createClient({
    url: "rediss://default:AdP7AAIncDFiNDA3MTRmNTc1NjU0YThiODIwZWUwMmUwZDEyNzFiMnAxNTQyNjc@clear-hound-54267.upstash.io:6379",
});
try {
  await client.connect();
  console.log("Connected to Redis");
} catch (error) {
  console.error("Failed to connect to Redis", error);
}

export { client };
