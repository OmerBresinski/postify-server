import express from "express";
import cors from "cors";
import { api } from "./api";
import passport from "passport";
import session from "express-session";
import config from "@/config";

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

app.listen(config.SERVER_PORT, () =>
  console.log(`Server started on port ${config.SERVER_PORT}`)
);

process.on("SIGTERM", async () => process.exit());
