import { Message } from "discord.js";
import { Argument, Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { timeframeArg } from "../common";
import MessageRepository from "../db/messageRepository";

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
    const repo = new MessageRepository();

    const repoQuery = timeframe !== 0 ? repo.getAll(timeframe) : repo.getAll();
    const msgPromises = await repoQuery;

    const messages = repo.convert(...msgPromises);
    const title = "Overview\n";

    const userDict = messages.reduce((dict, { discordId, count }) => {
      const prevValue = dict.get(discordId);
      const newValue = prevValue ? prevValue + count : count;
      return dict.set(discordId, newValue);
    }, new Map<string, number>());

    const formattedData = await Promise.all([...userDict.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(async ([discordId, total]) => {
        const { displayName, user: { tag } } = await guild.fetchMember(discordId);
        return `- ${total} **${displayName}** *(${tag})*`;
      }));

    const formattedText = formattedData.reduce((prev, curr) => prev += curr + "\n", title);

    return message.reply(formattedText);
    /*
    if (channel instanceof TextChannel) {
      return channel.send(reply);
    }
    return message.reply(reply);*/
  }
}
