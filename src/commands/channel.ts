import { Message, TextChannel } from "discord.js";
import { Argument, Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { timeframeArg } from "../common";
import messageRepository from "../db/messageRepository";

export default class Channel extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "channel",
      group: "common",
      memberName: "channel",
      description: "Displays overview of the wordcount of a channel",
      examples: ["!channel top-lane 2w", "!channel mid 1d", "!channel support 10 d"],
      args: [
        {
          key: "channel",
          label: "Channel to check",
          prompt: "Need a valid channel to check against",
          type: "channel",
        },
        timeframeArg,
      ],
      guildOnly: true,
    });
  }

  async run({ guild, message }: CommandMessage, { timeframe, channel: { name } }: { timeframe: number, channel: TextChannel }): Promise<Message | Message[]> {
    const repo = new messageRepository();
    const repoQuery = timeframe !== 0 ? repo.getFromChannel(name, timeframe) : repo.getFromChannel(name);
    const msgPromises = await repoQuery;

    const title = `Overview of channel ${name}\n`;

    const formattedData = await Promise.all(msgPromises
      .sort((a, b) => b.count - a.count)
      .map(async ({ discordId, count }) => {
        try {
          const { displayName, user: { tag } } = await guild.fetchMember(discordId);
          return `- ${count} **${displayName}** *(${tag})*`;
        } catch (exception) {
          return `- Error for discordId: ${discordId}`;
        }
      }));

    const formattedText = formattedData.reduce((prev, curr) => prev += curr + "\n", title);

    return message.reply(formattedText);
  }
}
