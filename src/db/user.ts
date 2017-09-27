import { Message as DMessage, TextChannel } from "discord.js";
import { IMessage, IUser, IUserModel, User as UserDB } from "../model/user";

export class User {
  private _userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }

  get messages() {
    return this._userModel.messages;
  }

  get discordId() {
    return this._userModel.discordId;
  }

  addMessage(msg: IMessage) {
    this._userModel.messages.push(msg);
    this.save();
  }

  save() {
    this._userModel.save((err: any) => { if (err) console.log("Error in save: ", err); });
  }
}
