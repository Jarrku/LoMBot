import { CommandoClient, FriendlyError } from "discord.js-commando";

export default (client: CommandoClient) => {
  client
    .on("error", console.error)
    .on("disconnect", () => console.warn("Disconnected!"))
    .on("reconnecting", () => console.warn("Reconnecting..."))
    .on("commandError", (cmd, err) => {
      if (err instanceof FriendlyError) return;
      console.error(
        `Error in command ${cmd.groupID}: ${cmd.memberName}, ${err}`,
      );
    })
    .on("commandBlocked", (msg, reason) => {
      console.log(
        `Command ${msg.command
          ? `${msg.command.groupID}:${msg.command.memberName}`
          : ""} blocked; ${reason}`,
      );
    });
};
