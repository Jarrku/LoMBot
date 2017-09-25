import { Document, DocumentQuery, model, Schema } from "mongoose";

// date in ISO format
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
  }],
});

export const User = model<IUserModel>("User", userSchema);

export default User;
