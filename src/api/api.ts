//create an express register router
import express from "express";
import * as Routes from "../routes";

export const api = express.Router();

api.use((req, res, next) => {
  if (!req.user) {
    console.log("not logged in");
    res.status(401).json({ message: "not logged in" });
  } else {
    next();
  }
});
api.use("/users", Routes.users);
api.use("/auth", Routes.auth);
