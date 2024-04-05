import express from "express"
export const gamesRouter = express.Router()
gamesRouter.use(express.json())

gamesRouter.get('/games', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, object: 0 }
    const games = await collection.find({ object: 'games' }).project(projection).toArray() || []
    return res.status(200).send(games)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

gamesRouter.post('/games', async (req, res) => {
  try {
    let newGame = req.body
    newGame.object = 'games'
    console.log("GAME BEING INSERTED", newGame)
    const collection = req.collection
    const result = await collection.insertOne(newGame)
    return res.status(201).send(newGame)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message)
  }
})

gamesRouter.get('/teams', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, teams: 0 }
    const teams = await collection.find({ object: 'teams' }).project(projection).toArray() || []
    return res.status(200).send(teams)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

gamesRouter.post('/teams', async (req, res) => {
  try {
    let newTeam = req.body
    newTeam.object = 'teams'
    console.log("TEAM BEING INSERTED", newTeam)
    const collection = req.collection
    await collection.insertOne(newTeam)
    return res.status(201).send(newTeam)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message)
  }
})

gamesRouter.get('/settings', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, object: 0 }
    const settings = await collection.find({ object: 'settings' }).project(projection).toArray() || []
    return res.status(200).send(settings)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
gamesRouter.put('/settings', async (req, res) => {
  try {
    let settings = req.body
    console.log("SETTINGS BEING UPDATED", settings)
    const collection = req.collection
    const result = await collection.updateOne(
      { object: 'settings' },
      { $set: settings},
      { upsert: true }
    )
    return res.status(200).send(settings)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message)
  }
})

gamesRouter.get('/rules', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, object: 0 }
    const response = await collection.find({ object: 'rules' }).project(projection).toArray()
    const rules = response[0]?.rules || []
    return res.status(200).send(rules)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

gamesRouter.get('/stats', async (req, res) => {
  try {
    const collection = req.collection
    const projection = { _id: 0, object: 0 }
    const stats = await collection.find({ object: 'stats' }).project(projection).toArray() || []
    return res.status(200).send(stats)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
gamesRouter.get('/refreshStats', async (req, res) => {
  try {
    const collection = req.collection
    const currentStats = await collection.find({ object: 'stats' }).toArray() || []

    // Stat calculation
    const totalGames = await collection.countDocuments({object: 'games'})


    await collection.updateOne(
      { object: 'stats' },
      { $set: currentStats},
      { upsert: true }
    )
    return res.status(200).send('Stats refreshed')
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
