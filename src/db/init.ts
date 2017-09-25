import { connect, connection } from "mongoose";

const initDb = () => {
  const { DB_USERNAME, DB_PASSWORD } = process.env;

  const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds151014.mlab.com:51014/lom`;

  connect(connectionString,
    {
      useMongoClient: true,
      promiseLibrary: global.Promise,
    });

  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => console.log("Connected to DB"));
};

export default initDb;
