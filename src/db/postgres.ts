import * as sql from "sequelize";

export default class Postgres {
  private static _instance: sql.Sequelize;

  static get instance() {
    if (!this._instance) {
      const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } = process.env;

      this._instance = new sql(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
        logging: false,
        dialect: "postgres",
        host: DB_HOSTNAME,
        port: 5432,
        dialectOptions: {
          ssl: false,
        },
      });

      this._instance.authenticate().then(() => console.log("Connected to the database"));

    }
    return this._instance;
  }
}
