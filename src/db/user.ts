import { Message as DMessage, TextChannel } from "discord.js";
import { IMessage, IUser, IUserModel, User as UserDB } from "../model/user";

export class User {
  constructor(readonly userModel: IUserModel) { }

  get messages() {
    return this.userModel.messages;
  }

  get discordId() {
    return this.userModel.discordId;
  }

  addMessage(msg: IMessage) {
    this.userModel.messages.push(msg);
    this.save();
  }

  save() {
    this.userModel.save((err: any) => { if (err) console.log("Error in save: ", err); });
  }
}
