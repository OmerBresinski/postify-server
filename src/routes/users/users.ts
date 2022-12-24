import { prisma } from "../../../prismaClient";
import express from "express";
import type { Request, Response } from "express";
import { getTwitterClient } from "@/utils/twitter/twitterClient";

let x = "";
export const users = express.Router();
const callbackURL = "http://127.0.0.1:4000/api/users/auth/twitter/callback";

users.get("/", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  return res.json(users);
});

users.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.users.findFirst({ where: { id: +req.params.id } });
  return res.json(user);
});

users.get("/auth/twitter", (req: Request, res: Response) => {
  const { url, codeVerifier, state } =
    getTwitterClient().generateOAuth2AuthLink(callbackURL, {
      scope: ["tweet.write", "tweet.read", "users.read", "offline.access"],
    });

  x = codeVerifier;
  res.send({ authUrl: url });
});

users.get("/auth/twitter/callback", async (req: Request, res) => {
  //get the code and state variables from req.query, and implement the callback function
  const { code, state } = req.query;
  res.redirect(`http://localhost:5173/?code=${code}&state=${state}}`);
});

users.get("/logout", (req, res) => {
  req.logout({ keepSessionInfo: true }, (err) => console.log(err));
  res.redirect("/");
});

users.post("/login", async (req, res) => {
  const { code, codeVerifier, redirectUri } = req.body;
  console.log({ code });
  try {
    const twitter = await getTwitterClient().loginWithOAuth2({
      code,
      codeVerifier: x,
      redirectUri: callbackURL,
    });
    const tweets = await twitter.client.v2.tweets("1590447156103897088");
    console.log(tweets);
  } catch (err) {
    console.log(err);
  }
});
