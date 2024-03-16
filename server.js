import express from 'express'
import { connectToDatabase } from './src/services/database.service.js'
import { gamesRouter } from './src/routes/games.router.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT;

app.options('*', cors())
app.use(async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const response = await connectToDatabase()
  req.db = response.db
  req.collection = response.collection
  next()
});
app.use(gamesRouter)

app.listen(port, () => {
  console.log(`Server started, listening on port: ${port}`)
})
