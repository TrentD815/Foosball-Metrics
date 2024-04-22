import express from "express"
export const gamesRouter = express.Router()
gamesRouter.use(express.json())
import { calculateStats, getTimeDifference, findSpecialGames } from "./utilities.js";

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
    console.log('Refreshing stats')
    const collection = req.collection
    const currentStats = await collection.find({ object: 'stats' }).toArray() || []
    const allGames = await collection.find({ object: 'games' }).toArray() || []

    // Milestones
    let firstGame = allGames.filter((game) => game.matchNumber === 1)
    firstGame = firstGame[0]?.matchDate || 'Not reached yet'
    let oneHundredthGame = allGames.filter((game) => game.matchNumber === 100)
    oneHundredthGame = oneHundredthGame[0]?.matchDate || 'Not reached yet'
    let twoHundredFiftiethGame = allGames.filter((game) => game.matchNumber === 250)
    twoHundredFiftiethGame = twoHundredFiftiethGame[0]?.matchDate || 'Not reached yet'
    let fiveHundredthGame = allGames.filter((game) => game.matchNumber === 500)
    fiveHundredthGame = fiveHundredthGame[0]?.matchDate || 'Not reached yet'
    let sevenHundredFiftiethGame = allGames.filter((game) => game.matchNumber === 750)
    sevenHundredFiftiethGame = sevenHundredFiftiethGame[0]?.matchDate || 'Not reached yet'
    let oneThousandthGame = allGames.filter((game) => game.matchNumber === 1000)
    oneThousandthGame = oneThousandthGame[0]?.matchDate || 'Not reached yet'

    // Games Played and Averages
    const gamesPlayedTotal = allGames.length || 0
    let latestGame = allGames.slice(-1)[0]
    latestGame = latestGame?.matchDate
    const timePlayed = getTimeDifference(firstGame, latestGame)
    const gamesPlayedPerYear = Math.round(gamesPlayedTotal / timePlayed * 100) / 100
    const gamesPlayedPerMonth = Math.round(gamesPlayedPerYear / 12 * 100) / 100
    const gamesPlayedPerWeek = Math.round(gamesPlayedPerYear / 52 * 100) / 100

    // Total Goals Scored
    let calculatedStats = calculateStats(allGames)
    let totalGoalsScored = []
    totalGoalsScored.push(
      { teamName: calculatedStats[0]?.team, goalsScored: calculatedStats[0]?.goalsScored },
      { teamName: calculatedStats[1]?.team, goalsScored: calculatedStats[1]?.goalsScored },
      { teamName: calculatedStats[2]?.team, goalsScored: calculatedStats[2]?.goalsScored },
      { teamName: calculatedStats[3]?.team, goalsScored: calculatedStats[3]?.goalsScored }
    )

    // Games Played Per Team
    let gamesPlayedPerTeam = []
    gamesPlayedPerTeam.push(
      { teamName: calculatedStats[0]?.team, gamesPlayed: gamesPlayedTotal },
      { teamName: calculatedStats[1]?.team, gamesPlayed:  calculatedStats[1]?.gamesPlayed },
      { teamName: calculatedStats[2]?.team, gamesPlayed:  calculatedStats[2]?.gamesPlayed },
      { teamName: calculatedStats[3]?.team, gamesPlayed:  calculatedStats[3]?.gamesPlayed }
    )

    // Average Goals Per Game
    let averageGoalsPerGame = []
    // Re-sort by average goals instead of total goals and exclude total temporarily
    const allGoalsScored = calculatedStats[0]?.goalsScored
    calculatedStats.shift()
    calculatedStats.sort((a, b) => b.goalsPerGame - a.goalsPerGame)
    averageGoalsPerGame.push(
      { teamName: calculatedStats[0]?.team, goalsPerGame: Math.round(calculatedStats[0]?.goalsPerGame * 100) / 100 },
      { teamName: calculatedStats[1]?.team, goalsPerGame:  Math.round(calculatedStats[1]?.goalsPerGame * 100) / 100 },
      { teamName: calculatedStats[2]?.team, goalsPerGame:  Math.round(calculatedStats[2]?.goalsPerGame * 100) / 100 },
      { teamName: "All Teams", goalsPerGame: Math.round(allGoalsScored / gamesPlayedTotal * 100) / 100 / 2 }
    )

    // Special Games
    const specialGames = findSpecialGames(allGames)
    const totalShutouts = specialGames.shutouts.length
    const totalOvertimes = specialGames.overtimes.length

    // Point Differential
    let pointDifferential = []
    calculatedStats.sort((a, b) => b.differential - a.differential)
    pointDifferential.push(
      { teamName: calculatedStats[0]?.team, pointDifferential: calculatedStats[0]?.differential },
      { teamName: calculatedStats[1]?.team, pointDifferential:  calculatedStats[1]?.differential },
      { teamName: calculatedStats[2]?.team, pointDifferential:  calculatedStats[2]?.differential }
    )

    // Wins
    let totalWins = []
    calculatedStats.sort((a, b) => b.wins - a.wins)
    totalWins.push(
      { teamName: calculatedStats[0]?.team, wins: calculatedStats[0]?.wins },
      { teamName: calculatedStats[1]?.team, wins: calculatedStats[1]?.wins },
      { teamName: calculatedStats[2]?.team, wins: calculatedStats[2]?.wins }
    )

    // Win Percentage
    let winPercentage = []
    calculatedStats.sort((a, b) => b.winPercentage - a.winPercentage)
    winPercentage.push(
      { teamName: calculatedStats[0]?.team,
        winPercentage: Math.round(calculatedStats[0]?.winPercentage * 100) / 100,
        wins: calculatedStats[0]?.wins, losses: calculatedStats[0]?.losses, gamesPlayed: calculatedStats[0]?.gamesPlayed },
      { teamName: calculatedStats[1]?.team,
        winPercentage: Math.round(calculatedStats[1]?.winPercentage * 100) / 100,
        wins: calculatedStats[1]?.wins, losses: calculatedStats[1]?.losses, gamesPlayed: calculatedStats[1]?.gamesPlayed },
      { teamName: calculatedStats[2]?.team,
        winPercentage: Math.round(calculatedStats[2]?.winPercentage * 100) / 100,
        wins: calculatedStats[2]?.wins, losses: calculatedStats[2]?.losses, gamesPlayed: calculatedStats[2]?.gamesPlayed }
    )

    let updatedStats = {
      gamesPlayedTotal,
      gamesPlayedPerWeek,
      gamesPlayedPerMonth,
      gamesPlayedPerYear,
      totalGoalsScored,
      gamesPlayedPerTeam,
      averageGoalsPerGame,
      firstGame,
      oneHundredthGame,
      twoHundredFiftiethGame,
      fiveHundredthGame,
      sevenHundredFiftiethGame,
      oneThousandthGame,
      totalShutouts,
      totalOvertimes,
      pointDifferential,
      totalWins,
      winPercentage
    }
    console.log("UPDATED", updatedStats)
    await collection.updateOne(
      { object: 'stats' },
      { $set: updatedStats},
      { upsert: true }
    )
    return res.status(200).send('Stats refreshed')
  } catch (error) {
    return res.status(500).send(error.message)
  }
})


