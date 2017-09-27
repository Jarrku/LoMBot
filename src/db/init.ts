import mongoose = require("mongoose");

export default () => {
  const { DB_USERNAME, DB_PASSWORD } = process.env;

  const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds151014.mlab.com:51014/lom`;

  mongoose.connect(connectionString, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  });

  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  mongoose.connection.once("open", () => {
    mongoose.Promise = global.Promise;
    console.log("Connected to DB");
  });
};
