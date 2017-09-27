import { Message, TextChannel } from "discord.js";
import { isInRoleCollection } from "./common";
import MessageRepository from "./db/messageRepository";

import config from "./config";

export const onMessageHandler = async (msg: Message) => {
  const { educhannels } = config;
  const { channel, member: { roles, id }, content, createdAt } = msg;

  if (educhannels.includes(channel.id)) {
    if (isInRoleCollection(roles, "mentor", "trial mentor")) {
      const repo = new MessageRepository();
      const { name } = (channel as TextChannel);

      repo.create({
        discordId: id,
        channel: name,
        count: content.split(" ").length,
        date: createdAt.valueOf(),
      });
    }
  }
};
