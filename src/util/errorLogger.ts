import { CommandoClient, FriendlyError } from "discord.js-commando";

export default (client: CommandoClient) => {
  if (process.env.NODE_ENV !== "production") {
    client.on("warn", console.warn).on("debug", console.info);
  }

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
