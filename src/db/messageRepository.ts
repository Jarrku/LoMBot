import * as sequelize from "sequelize";
import MessageDB from "../model/message";

export default class MessageRepository {
  getFromChannel(channel: string, afterDate?: number) {
    let opt = {};
    if (afterDate) {
      opt = {
        date: {
          [sequelize.Op.gt]: afterDate,
        },
      };
    }

    return MessageDB.findAll({
      attributes: ["discordId", [sequelize.fn("SUM", sequelize.col("count")), "count"]],
      group: "discordId",
      raw: true,
      where: {
        channel,
        ...opt,
      },
    });
  }

  getFromUser(discordId: string, afterDate?: number) {
    let opt = {};
    if (afterDate) {
      opt = {
        date: {
          [sequelize.Op.gt]: afterDate,
        },
      };
    }

    return MessageDB.findAll({
      attributes: ["channel", [sequelize.fn("SUM", sequelize.col("count")), "count"]],
      group: "channel",
      raw: true,
      where: {
        discordId,
        ...opt,
      },
    });
  }

  getAll(afterDate?: number) {
    let opt = {};
    if (afterDate) {
      opt = {
        date: {
          [sequelize.Op.gt]: afterDate,
        },
      };
    }

    return MessageDB.findAll({
      attributes: ["discordId", [sequelize.fn("SUM", sequelize.col("count")), "count"]],
      group: "discordId",
      raw: true,
      where: {
        ...opt,
      },
    });
  }
}

Object.seal(MessageRepository);
