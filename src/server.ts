import express from "express";
import cors from "cors";
import { api } from "./api";
import session from "express-session";
import config from "@/config";

const app = express();

app.use(
  session({
    name: "postify",
    secret: "shimmering_unicorn",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api", api);

app.listen(config.SERVER_PORT, () =>
  console.log(`Server started on port ${config.SERVER_PORT}`)
);

process.on("SIGTERM", async () => {
  console.log("Restarting..");
  process.exit();
});
