import { GuildMember, Message } from "discord.js";
import { Argument, Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { timeframeArg } from "../common";
import messageRepository from "../db/messageRepository";

export default class Detail extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "detail",
      group: "common",
      memberName: "detail",
      description: "Displays detailed wordcount of a specific user",
      examples: ["!detail jarrku 2w", "!detail jarrku 1d", "!detail jarrku 10 d"],
      args: [
        {
          key: "mentor",
          label: "Mentor to check",
          prompt: "Need a valid name to check against",
          type: "member",
        },
        timeframeArg,
      ],
      guildOnly: true,
    });
  }

  async run({ message }: CommandMessage, { timeframe, mentor: { id, displayName } }: { timeframe: number, mentor: GuildMember }): Promise<Message | Message[]> {
    const repo = new messageRepository();
    const repoQuery = timeframe !== 0 ? repo.getFromUser(id, timeframe) : repo.getFromUser(id);
    const msgPromises = await repoQuery;

    const title = `Overview of ${displayName}\n`;

    const formattedText = msgPromises
      .sort((a, b) => b.count - a.count)
      .map(({ channel, count }) => `- ${count} **${channel}**`)
      .reduce((prev, curr) => prev += curr + "\n", title);

    return message.reply(formattedText);
  }
}
