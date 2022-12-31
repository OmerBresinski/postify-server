import express from "express";
import type { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
import { prismaClient } from "@/utils/prisma/prismaClient";
import { getCompletionClient } from "@/utils/openai/completionClient";

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

tweets.post("/completion", async (req: Request, res: Response) => {
  const { text } = req.body;
  const { twitterAccessToken, twitterId } = req.user!;
  const { v2: twitter } = new TwitterApi(twitterAccessToken);

  const pastTweetsResponse = await twitter.get(`users/${twitterId}/tweets`);
  const pastTweets = pastTweetsResponse.data.map(
    (tweet: { text: string }) => tweet
  );

  const completion = await getCompletionClient().createCompletion({
    text,
    pastTweets,
  });
  console.log(JSON.stringify(completion.data.choices, null, 2));

  res.status(200).json({ completion: completion.data.choices[0].text });
});
