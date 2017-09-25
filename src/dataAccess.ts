import { Message as DMessage, TextChannel } from "discord.js";

import { IMessage, IUser, IUserModel, User } from "./model/user";

const cb = (mentor: IUserModel, newMessage: IMessage) => {
  mentor.messages.push(newMessage);
  mentor.save((err: any) => { if (err) console.log("Error in save: ", err); });
};

export const addNewMessage = (msg: DMessage) => {
  console.log("Adding new message");

  const { name } = (msg.channel as TextChannel);
  const { author: { id }, createdAt, content } = msg;

  const newMsg: IMessage = {
    channel: name,
    count: content.split(" ").length,
    date: createdAt.valueOf(),
  };

  const condition = { discordId: id };

  User.findOne(condition, (err, user) => {
    if (err)
      console.log("Error in findOne:", err);

    if (!user)
      user = new User(condition);

    cb(user, newMsg);
  });
};

export const getOverview = async (): Promise<Array<{ discordId: string, total: number }>> => {
  const users = await User.find({}).exec();

  return users.map(({ discordId, messages }) => {
    const total = messages.reduce((prev, curr) => prev + curr.count, 0);
    return { discordId, total };
  }).sort((a, b) => b.total - a.total);
};
