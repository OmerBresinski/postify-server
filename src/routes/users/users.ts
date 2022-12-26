import { prismaClient } from "@/utils/prisma/prismaClient";
import express from "express";
import type { Request, Response } from "express";

export const users = express.Router();

users.get("/", async (req: Request, res: Response) => {
  console.log(req.session);
  const users = await prismaClient.users.findMany();
  return res.json(users);
});

users.get("/:id", async (req: Request, res: Response) => {
  const user = await prismaClient.users.findFirst({
    where: { id: +req.params.id },
  });
  return res.json(user);
});
