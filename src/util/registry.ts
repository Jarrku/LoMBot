import { CommandoClient } from "discord.js-commando";
import * as path from "path";

export default (client: CommandoClient) => {
  client.registry
    .registerGroups([["common", "Common"], ["util", "Utilities"]])
    .registerDefaultTypes()
    .registerDefaultCommands({
      prefix: false,
      eval_: false,
      ping: false,
      commandState: false,
    })
    .registerCommandsIn(path.join(__dirname, "../commands"));
};
