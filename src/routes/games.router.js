import express from "express";
export const gamesRouter = express.Router();
gamesRouter.use(express.json())

gamesRouter.get('/games', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, object: 0 }
    const games = await collection.find({object: 'games'}).project(projection).toArray()
    res.status(200).send(games);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

gamesRouter.post('/games', async (req, res) => {
  try {
    let newGame = req.body;
    newGame.object = 'games'
    console.log("GAME BEING INSERTED", newGame)
    const collection = req.collection
    const result = await collection.insertOne(newGame)
    res.status(201).send(newGame)
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
