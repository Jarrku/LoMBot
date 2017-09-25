import { Message, TextChannel } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import { getOverview } from "../dataAccess";

export default class Overview extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "overview",
      group: "common",
      memberName: "overview",
      description: "Displays overview of all roles",
      guildOnly: true,
    });
  }

  async run({ channel, guild, message }: CommandMessage): Promise<Message | Message[]> {

    const title = `Overview:\n`;
    const data = await getOverview();
    const dataWithName = await Promise.all(data.map(async ({ discordId, total }) => {
      const { displayName, user: { tag } } = await guild.fetchMember(discordId);
      return `- ${total} **${displayName}** *(${tag})*`;
    }));

    const reply = dataWithName.reduce((prev, curr) => prev += curr + "\n", title);

    if (channel instanceof TextChannel) {
      return channel.send(reply);
    }
    return message.reply(reply);
  }
}
