//create an express register router
import express from "express";
import * as Routes from "../routes";

export const api = express.Router();

api.use("/auth", Routes.auth);
api.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "not logged in" });
  } else {
    next();
  }
});
api.use("/users", Routes.users);
api.use("/tweets", Routes.tweets);
