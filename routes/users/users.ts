import { prisma } from "../../prismaClient";
import { Users } from "@prisma/client";
import express from "express";
import type { Request, Response } from "express";

export const users = express.Router();

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
