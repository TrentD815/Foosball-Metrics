const express = require("express")
const MongoDB = require("mongodb");
import { environment } from 'src/environments/environment';

const app = express()
const DB_URI = environment.dbConnectionString
const port = environment.port;

const { connectToDatabase } = require('./src/services/database.service.ts')
const gamesRouter = require('./src/routes/games.router.ts');

const client = new MongoDB.MongoClient(DB_URI);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

await connectToDatabase().catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

// Adding listeners
// function setupListeners(client: MongoClient){
//   client.addListener('topologyClosed', ()=>{
//     isTopologyConnected = false;
//     console.warn("topologyClosed");
//   })
// }
// process.on("exit", () => {
//   console.log("EXIT - MongoDB Client disconnected");
//   closeConnection()
// });
//
// //Cleanups
// //catching signals and doing cleanup
// ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
//   'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
// ].forEach(function (signal) {
//   process.on(signal, function () {
//     if (isTopologyConnected){
//       client.close();
//     }
//     process.exit(1);
//   });
// });

