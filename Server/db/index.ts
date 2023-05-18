import mongoose, { Connection, Mongoose } from "mongoose";

const mongoHost = process.env.MONGO_HOST; // should be localhost or server address
const mongoUser = process.env.MONGO_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_ROOT_PASSWORD;

var databaseName = "testDB";

console.log("Connecting to mongo...");

mongoose
    .connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:27017/${databaseName}`, { authSource: "admin" })
    .catch((e:any) => {
        console.error("Connection error", e.message);
    })
    .then(() => {
        console.log("Connected to MongoDB");
    });

const db: Connection = mongoose.connection;

export default db;