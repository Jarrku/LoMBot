import { Message } from "discord.js";
import { Argument, Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { timeframeArg } from "../common";
import messageRepository from "../db/messageRepository";


export default class Overview extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "overview",
      group: "common",
      memberName: "overview",
      description: "Displays overview of the wordcount",
      examples: ["!overview 2w", "!overview 1d", "!overview 10 d"],
      args: [
        timeframeArg,
      ],
      guildOnly: true,
    });
  }

  async run({ guild, message }: CommandMessage, { timeframe }: { timeframe: number }): Promise<Message | Message[]> {
    const repo = new messageRepository();
    const repoQuery = timeframe !== 0 ? repo.getAll(timeframe) : repo.getAll();
    const msgPromises = await repoQuery;

    const title = "Overview\n";

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
