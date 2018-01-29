import * as dotenv from "dotenv";
dotenv.config();
import { CommandoClient } from "discord.js-commando";
import { createServer } from "http";
import { onMessageHandler } from "./eventHandlers";

import configureErrorLogging from "./util/errorLogger";
import configureClientRegistry from "./util/registry";

const client = new CommandoClient({
  disabledEvents: ["TYPING_START"],
  commandPrefix: "!",
  unknownCommandResponse: false,
  owner: "131418385610309633",
});

configureErrorLogging(client);
configureClientRegistry(client);

client
  .on("ready", () => console.log("Bot is ready."))
  .on("message", onMessageHandler);

const BOT_SECRET = process.env.BOT_SECRET_PROD;
client.login(BOT_SECRET!);

if (process.env.NODE_ENV === "production") {
  createServer().listen(3000);
}

// close websocket before exiting process
process.on("SIGINT", () => {
  client.destroy();
  process.exit(0);
});
