import express from "express";
import type { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";

export const tweets = express.Router();

tweets.get("/", async (req: Request, res: Response) => {
  const { twitterAccessToken, twitterId } = req.user!;
  const { v2: twitter } = new TwitterApi(twitterAccessToken);

  const tweets = await twitter.get(`users/${twitterId}/tweets`);

  res.status(200).json(tweets);
});
