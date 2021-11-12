const dotenv = require("dotenv");
dotenv.config({ path: __dirname+'/.env' });
const express = require("express")
const MongoDB = require("mongodb");

const DB_URI = process.env.DB_CONN_STRING
const app = express()
const port = process.env.PORT;

const connectToDatabase = require('./src/services/database.service.ts')
const gamesRouter = require('./src/routes/games.router.ts');

const client = new MongoDB.MongoClient(DB_URI);

// async function connectToDatabase () {
//   try {
//     await client.connect()
//     const db = client.db(process.env.DB_NAME);
//     const foosballCollection = db.collection(process.env.COLLECTION_NAME);
//     console.log(`Successfully connected to database: ${db.databaseName} and collection: ${foosballCollection.collectionName}`);
//   }
//   catch (err) {
//     console.error(`Database connection failed ${err}`)
//     process.exit();
//   }
// }
// connectToDatabase()

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`)
// })

connectToDatabase()
  .then(() => {
    app.use("/games", gamesRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
  });



