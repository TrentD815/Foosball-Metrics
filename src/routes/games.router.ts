import express, { Request, Response } from "express";
import Game from "../models/game";
const collections = {}
export const gamesRouter = express.Router();
gamesRouter.use(express.json())

gamesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    // @ts-ignore
    const games = (await collections.games.find({}).toArray()) as Game[];

    res.status(200).send(games);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

gamesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newGame = req.body as Game;
    // @ts-ignore
    const result = await collections.games.insertOne(newGame);

    result
      ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
