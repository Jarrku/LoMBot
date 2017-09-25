import { Document, DocumentQuery, model, Schema } from "mongoose";

// date in unix timestamp format
export interface IMessage {
  channel: string;
  count: number;
  date: number;
}

// Id -> unique discord ID
export interface IUser {
  discordId: string;
  messages: IMessage[];
}

export interface IUserModel extends IUser, Document { }

const userSchema = new Schema({
  discordId: String,
  messages: [{
    channel: String,
    count: Number,
    date: Number,
  }, {
    _id: false,
  }],
});

export const User = model<IUserModel>("User", userSchema, "users");

export class UserModel {
  private _userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }

  get discordId(): string {
    return this._userModel.discordId;
  }

  get messages(): IMessage[] {
    return this._userModel.messages;
  }
}

export default User;
