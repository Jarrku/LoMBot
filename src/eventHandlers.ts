import { Message, TextChannel } from "discord.js";
import { isInRoleCollection } from "./common";
import UserRepository from "./db/userRepository";

import config from "./config";

export const onMessageHandler = async (msg: Message) => {
  const { educhannels } = config;
  const { channel, member: { roles, id }, content, createdAt } = msg;

  if (educhannels.includes(channel.id)) {
    if (isInRoleCollection(roles, "mentor", "trial mentor")) {
      const repo = new UserRepository();
      let user = await repo.getUser(id);
      if (!user) {
        user = await repo.createUser(id);
      }

      const { name } = (channel as TextChannel);

      const newMsg = {
        channel: name,
        count: content.split(" ").length,
        date: createdAt.valueOf(),
      };

      user.addMessage(newMsg);
    }
  }
};
