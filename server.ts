import "dotenv";
import express from "express";
import cors from "cors";
import { api } from "./api";
import passport from "passport";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "shimmering_unicorn",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use("/api", api);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server started on port ${process.env.SERVER_PORT}`)
);
