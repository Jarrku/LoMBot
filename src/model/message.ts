import * as Sequelize from "sequelize";
import postgres from "../db/postgres";

const sequelize = postgres.instance;

export interface IMessage {
  discordId: string;
  channel: string;
  count: number;
  date: number;
}

const Message = sequelize.define<IMessage, {}>("messages", {
  discordId: {
    type: Sequelize.STRING,
  },
  channel: {
    type: Sequelize.STRING,
  },
  count: {
    type: Sequelize.DOUBLE,
  },
  date: {
    type: Sequelize.DOUBLE,
  },
});

// force: true will drop the table if it already exists
Message.sync();

export default Message;
