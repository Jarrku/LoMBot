import { Message } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import UserRepository from "../db/userRepository";

export default class Overview extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "overview",
      group: "common",
      memberName: "overview",
      description: "Displays overview of the wordcount",
      guildOnly: true,
    });
  }

  async run({ guild, message }: CommandMessage): Promise<Message | Message[]> {
    const repo = new UserRepository();
    const users = await repo.getAll();

    const title = "Overview\n";

    const formattedData = await Promise.all(
      users
        .map(({ discordId, messages }) => {
          const total = messages.reduce((accum, msg) => accum + msg.count, 0);
          return { discordId, total };
        })
        .sort((a, b) => b.total - a.total)
        .map(async ({ total, discordId }) => {
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
