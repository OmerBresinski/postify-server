import express from "express";
import cors from "cors";
import { api } from "./api";
import session from "express-session";
import passport from "passport";
import config from "@/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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
app.use(
  session({
    name: "postify",
    secret: "shimmering_unicorn",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "none",
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api);

app.listen(config.SERVER_PORT, () =>
  console.log(`Server started on port ${config.SERVER_PORT}`)
);

process.on("SIGTERM", async () => {
  console.log("Restarting..");
  process.exit();
});
