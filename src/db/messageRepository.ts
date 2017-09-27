import { IMessage, IMessageModel, Message, MessageDB } from "../model/message";
import BaseRepo from "./baseRepository";

export default class MessageRepository extends BaseRepo<IMessageModel, IMessage> {
  constructor() {
    super(MessageDB);
  }

  getFromChannel(channel: string, afterDate?: number) {
    const query = afterDate ? { channel, date: { $gt: afterDate } } : { channel };
    return super.find(query);
  }

  getFromUser(discordId: string, afterDate?: number) {
    const query = afterDate ? { discordId, date: { $gt: afterDate } } : { discordId };
    return super.find(query);
  }

  getAll(afterDate?: number) {
    const query = afterDate ? { date: { $gt: afterDate } } : {};
    return super.find(query);
  }

  convert(...models: IMessageModel[]) {
    return models.map((m) => new Message(m));
  }
}

Object.seal(MessageRepository);
