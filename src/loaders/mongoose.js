
// Example file of a LOADER.JS file : Loads & gets a Database connection


// CONFIG VS ENV?
// Priority: process.env.DATABASE_URL -> config.json

/*
import * as mongoose from 'mongoose';
export default async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });
  return connection.connection.db;
};
*/
