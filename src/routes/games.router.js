import express from "express";
export const gamesRouter = express.Router();
gamesRouter.use(express.json())

gamesRouter.get('/games', async (req, res) => {
  try {
    const collection = req.collection
    const games = await collection.find({object: 'games'}).toArray()
    res.status(200).send(games);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

gamesRouter.post('/games', async (req, res) => {
  try {
    const collection = req.collection
    req.body.game = {matchNumber: 3, score: '10-11', team1: "Rob/Lou", team2: 'Trent/Adam', matchDate: '9/29/21', object: "games"}
    const newGame = req.body.game;
    const result = await collection.insertOne(newGame)
    res.status(201).send(`Successfully created a new game with id: ${result.insertedId}`)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
