import express from "express";
import Config from "@/config";
import { prismaClient } from "@/utils/prisma/prismaClient";
import passport from "passport";
import Twitter from "passport-twitter";

const TwitterStrategy = Twitter.Strategy;
passport.use(
  new TwitterStrategy(
    {
      consumerKey: Config.TWITTER_API_KEY!,
      consumerSecret: Config.TWITTER_API_SECRET!,
      callbackURL: "http://127.0.0.1:4000/api/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, cb) {
      const user = await prismaClient.users.upsert({
        where: {
          twitterId: profile.id,
        },
        update: {
          twitterAccessToken: token,
          twitterAccessSecret: tokenSecret,
          profileUrl: profile.photos?.[0].value,
        },
        create: {
          twitterId: profile.id,
          twitterAccessToken: token,
          twitterAccessSecret: tokenSecret,
          profileUrl: profile.photos?.[0].value,
        },
      });

      cb(user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj as any);
});

export const auth = express.Router();

auth.get("/twitter", passport.authenticate("twitter"));

auth.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("callback", req);
    res.redirect("http://127.0.0.1:5173/");
  }
);
