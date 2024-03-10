import * as mongoDB from "mongodb";
export async function connectToDatabase() {
  console.log("CONNECTING TO DB")
  console.log("CONNECTION STRING", process.env.DB_CONNECTION_STRING)
  const client = new mongoDB.MongoClient(process.env.DB_CONNECTION_STRING);
  await client.connect();
  const db= client.db(process.env.DB_NAME);
  const collection = db.collection(process.env.DB_COLLECTION);
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collection.collectionName}`);
}
