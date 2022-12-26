import express from "express";
import Config from "@/config";
import { prismaClient } from "@/utils/prisma/prismaClient";
import {
  getTwitterClient,
  getTwitterUserClient,
} from "@/utils/twitter/twitterClient";

export const auth = express.Router();

let cache: Record<string, any> = {};

auth.get("/twitter", async (req, res) => {
  const { url, oauth_token, oauth_token_secret } =
    await getTwitterClient().generateAuthLink(Config.TWITTER_CALLBACK_URL);

  req.session.oauth_token = oauth_token;
  req.session.oauth_token_secret = oauth_token_secret;

  cache[oauth_token] = oauth_token_secret;
  res.json({ authUrl: url });
});

auth.get("/twitter/callback", async (req, res) => {
  try {
    const oauthToken = req.query.oauth_token as string;
    const oauthVerifier = req.query.oauth_verifier as string;
    const oauthSecret = cache[oauthToken];

    const userClient = await getTwitterUserClient({
      accessToken: oauthToken,
      accessSecret: oauthSecret,
      oauthVerifier: oauthVerifier,
    });

    const user = await userClient.currentUserV2();

    const existingUser = await prismaClient.users.findFirst({
      where: { twitterId: user.data.id },
    });

    if (!existingUser) {
      await prismaClient.users.create({
        data: {
          twitterId: user.data.id,
          profileUrl: user.data.profile_image_url,
          twitterAccessToken: oauthToken,
          twitterAccessSecret: oauthSecret,
          twitterOauthVerifier: oauthVerifier,
        },
      });
    }
    console.log(req.session);
    res.redirect("http://127.0.0.1:5173/");
  } catch (ex) {
    console.log(ex as Error);
  }
});
