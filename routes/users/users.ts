import { prisma } from "../../prismaClient";
import { Users } from "@prisma/client";
import express from "express";
import passport from "passport";
import TwitterStrategy from "passport-twitter";
import type { Request, Response } from "express";

export const users = express.Router();
passport.use(
  new TwitterStrategy.Strategy(
    {
      consumerKey: process.env.TWITTER_API_KEY!,
      consumerSecret: process.env.TWITTER_API_SECRET!,
      callbackURL: "http://127.0.0.1:4000/api/users/auth/twitter/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Find or create the user in your database based on their Twitter profile
        console.log(profile);
        // const user = await findOrCreateUser(profile);
        const user = prisma.users.create({
          data: { email: "omer@twitter.com" },
        });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

users.post("/", async (req: Request, res: Response) => {
  const { email, profileUrl } = req.body as Users;
  const note = await prisma.users.create({
    data: {
      email,
      profileUrl,
    },
  });
  return res.json(note);
});

users.get("/", async (_req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  return res.json(users);
});

users.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.users.findFirst({ where: { id: +req.params.id } });
  return res.json(user);
});

users.post("/auth/twitter", passport.authenticate("twitter"));

users.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Callback", { req, res });
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

users.get("/logout", (req, res) => {
  req.logout({ keepSessionInfo: true }, (err) => console.log(err));
  res.redirect("/");
});
