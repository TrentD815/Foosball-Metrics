import express from 'express'
import { connectToDatabase } from './src/services/database.service.js'
import { gamesRouter } from './src/routes/games.router.js'

const app = express()
const port = process.env.PORT;

app.use(async function(req, res, next) {
  const response = await connectToDatabase()
  req.db = response.db
  req.collection = response.collection
  next()
});
app.use(gamesRouter)

app.listen(port, () => {
  console.log(`Server started, listening on port: ${port}`)
})
