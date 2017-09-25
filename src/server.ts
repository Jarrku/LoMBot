import { Message, Role, TextChannel } from "discord.js";
import { Command, CommandoClient } from "discord.js-commando";
import { createServer } from "http";
import * as path from "path";
import { isInRoleCollection } from "./common";
import { addNewMessage } from "./dataAccess";

import config from "./config";
import dbInit from "./db/init";
import configureErrorLogging from "./util/errorLogger";

import * as dotenv from "dotenv";
dotenv.config();
dbInit();

const BOT_SECRET = process.env.NODE_ENV !== "production" ? process.env.BOT_SECRET_DEV : process.env.BOT_SECRET_PROD;

const client = new CommandoClient({
  disabledEvents: ["TYPING_START"],
  commandPrefix: "!",
  unknownCommandResponse: false,
  owner: "131418385610309633",
});

configureErrorLogging(client);

client
  .on("ready", () => console.log("Bot is ready."))
  .on("message", (msg: Message) => {
    const { educhannels } = config;
    const { channel: { id }, member: { roles } } = msg;

    if (educhannels.includes(id)) {
      if (isInRoleCollection(roles, undefined, ["mentor", "trial mentor"]))
        addNewMessage(msg);
    }
  });

client.registry
  .registerGroups([["common", "Common"], ["util", "Utilities"]])
  .registerDefaultTypes()
  .registerDefaultCommands({
    prefix: false,
    eval_: false,
    ping: false,
    commandState: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.login(BOT_SECRET!);

if (process.env.NODE_ENV === "production") {
  createServer().listen(3000);
}
// close websocket before exiting process
process.on("SIGINT", () => {
  client.destroy();
  process.exit(0);
});
