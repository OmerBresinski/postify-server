import express from "express";
import type { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
import { prismaClient } from "@/utils/prisma/prismaClient";

export const tweets = express.Router();

tweets.get("/", async (req: Request, res: Response) => {
  const { twitterAccessToken, twitterId } = req.user!;
  const { v2: twitter } = new TwitterApi(twitterAccessToken);

  const tweets = await twitter.get(`users/${twitterId}/tweets`);

  res.status(200).json(tweets);
});

tweets.post("/", async (req: Request, res: Response) => {
  const { text, scheduledDate } = req.body;

  const scheduledTweet = await prismaClient.tweets.create({
    data: {
      scheduledDate,
      text,
      user: {
        connect: {
          id: req.user!.id,
        },
      },
    },
  });

  res.status(200).json(scheduledTweet);
});
