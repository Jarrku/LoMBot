import { Message, TextChannel } from "discord.js";
import { Argument, Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { timeframeArg } from "../common";
import MessageRepository from "../db/messageRepository";

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
    const repo = new MessageRepository();

    const repoQuery = timeframe !== 0 ? repo.getFromChannel(name, timeframe) : repo.getFromChannel(name);
    const msgPromises = await repoQuery;

    const messages = repo.convert(...msgPromises);
    const title = `Overview of channel ${name}\n`;

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
