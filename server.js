import express from 'express'
const app = express()
const port = process.env.PORT;
import { connectToDatabase } from './src/services/database.service.js'

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
connectToDatabase().catch((error) => {
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

