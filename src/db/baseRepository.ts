import { Document, Model, Query, Types } from "mongoose";

export interface IRead<T> {
  retrieve: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  findOne(query: object): Promise<T | null>;
  find(query: object): Promise<T[]>;
}

export interface IWrite<T, X> {
  create: (item: X) => Promise<T>;
  update: (query: object, item: T) => Promise<T>;
  delete: (query: object) => Promise<void>;
}

export default abstract class RepositoryBase<T extends Document, X> implements IRead<T>, IWrite<T, X> {
  constructor(protected readonly db: Model<T>) { }

  create(item: X) {
    return this.db.create(item);
  }

  retrieve() {
    return this.db.find({}).exec();
  }

  update(query: object, item: T) {
    return this.db.update(query, item).exec();
  }

  delete(query: object) {
    return this.db.remove(query).exec();
  }

  findById(_id: string) {
    return this.db.findById(_id).exec();
  }

  findOne(query: object) {
    return this.db.findOne(query).exec();
  }

  find(query: object) {
    return this.db.find(query).exec();
  }
}
