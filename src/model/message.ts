import { Document, DocumentQuery, model, Schema } from "mongoose";
import BaseClass from "./baseClass";

// date in unix timestamp format
export interface IMessage {
  discordId: string;
  channel: string;
  count: number;
  date: number;
}

export interface IMessageModel extends IMessage, Document { }

const messageSchema = new Schema({
  discordId: String,
  channel: String,
  count: Number,
  date: Number,
});

export const MessageDB = model<IMessageModel>("Message", messageSchema, "messages");

export class Message extends BaseClass<IMessageModel> {
  get discordId() {
    return this.model.discordId;
  }
  get channel() {
    return this.model.channel;
  }

  get count() {
    return this.model.count;
  }
  get date() {
    return this.model.date;
  }
}

Object.seal(Message);
export default MessageDB;
