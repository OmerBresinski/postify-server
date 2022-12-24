import dotenv from "dotenv";
dotenv.config();

export default {
  env: process.env.env,
  SERVER_PORT: process.env.SERVER_PORT,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
};
