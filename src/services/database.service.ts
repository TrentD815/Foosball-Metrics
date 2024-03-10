import * as mongoDB from "mongodb";
import { environment } from 'src/environments/environment';

export const collections: { games?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(environment.dbConnectionString);
  await client.connect();
  const db: mongoDB.Db = client.db(environment.dbName);
  const gamesCollection: mongoDB.Collection = db.collection(environment.dbCollection);
  collections.games = gamesCollection;
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
}
