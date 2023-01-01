import dotenv from "dotenv";
dotenv.config();

export default {
  env: process.env.env,
  SERVER_PORT: process.env.SERVER_PORT,
  TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL,
  TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
  OPEN_AI_KEY: process.env.OPEN_AI_KEY,
  OPEN_AI_ORG: process.env.OPEN_AI_ORG,
};
