import mongoose = require("mongoose");

export default () => {
  const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME } = process.env;
  const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}`;

  mongoose.connect(connectionString, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
    keepAlive: 120,
    ssl: true,
  });

  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  mongoose.connection.once("open", () => {
    mongoose.Promise = global.Promise;
    console.log("Connected to DB");
  });
};
