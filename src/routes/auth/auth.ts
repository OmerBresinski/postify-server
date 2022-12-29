import express, { NextFunction, Request, Response } from "express";
import Config from "@/config";
import { prismaClient } from "@/utils/prisma/prismaClient";
import passport from "passport";
import { Strategy as TwitterStrategy } from "@superfaceai/passport-twitter-oauth2";

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user: Express.User, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new TwitterStrategy(
    {
      clientType: "confidential",
      clientID: Config.TWITTER_CLIENT_ID!,
      clientSecret: Config.TWITTER_CLIENT_SECRET!,
      callbackURL: Config.TWITTER_CALLBACK_URL!,
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await prismaClient.users.upsert({
        where: {
          twitterId: profile.id,
        },
        update: {
          twitterAccessToken: accessToken,
          twitterAccessSecret: refreshToken,
          profileUrl: profile.photos?.[0].value,
        },
        create: {
          twitterId: profile.id,
          twitterAccessToken: accessToken,
          twitterAccessSecret: refreshToken,
          profileUrl: profile.photos?.[0].value,
        },
      });
      done(null, user);
    }
  )
);

export const auth = express.Router();

auth.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
  })
);

auth.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://127.0.0.1:5173/",
    failureRedirect: "/login",
  })
);

auth.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://127.0.0.1:5173/login");
  });
});
