
import { Document } from "mongoose";

export default abstract class BaseClass<T extends Document> {
  constructor(protected readonly model: T) { }

  save() {
    this.model.save((err: any) => { if (err) console.log("Error in save: ", err); });
  }
}
