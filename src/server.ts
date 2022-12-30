import express from "express";
import cors from "cors";
import { api } from "./api";
import session from "express-session";
import passport from "passport";
import config from "@/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { prismaClient } from "./utils/prisma/prismaClient";
import TwitterApi from "twitter-api-v2";

const app = express();

app.use(
  cors({
    origin: [
      /^https:\/\/twitter\.com\/i\/oauth2\/.*$/,
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:4000",
      "http://localhost:4000/api/auth/twitter",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    name: "postify",
    secret: "shimmering_unicorn",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.authenticate("session"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", api);

app.listen(config.SERVER_PORT, () =>
  console.log(`Server started on port ${config.SERVER_PORT}`)
);

// const ONE_MINUTE = 1000 * 10;
// setInterval(async () => {
//   try {
//     console.log(`${new Date()} scheduling`);
//     const users = await prismaClient.users.findMany({
//       include: {
//         tweets: {
//           where: {
//             status: "pending",
//             scheduledDate: {
//               lte: new Date(),
//             },
//           },
//         },
//       },
//     });

//     for (const user of users) {
//       const twitterClient = new TwitterApi(user.twitterAccessToken);
//       await Promise.all(
//         user.tweets.map(({ text }) => twitterClient.v2.tweet(text))
//       );
//       await prismaClient.tweets.updateMany({
//         where: {
//           id: {
//             in: user.tweets.map(({ id }) => id),
//           },
//         },
//         data: {
//           status: "scheduled",
//         },
//       });
//     }
//   } catch (ex) {
//     console.log(ex);
//   }
// }, ONE_MINUTE);

process.on("SIGTERM", async () => {
  console.log("Restarting..");
  process.exit();
});
