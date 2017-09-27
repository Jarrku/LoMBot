import { IUserModel, User as UserDB } from "../model/user";
import { User } from "./user";

export default class UserRepository {
  createUser = (discordId: string) => {
    const res = UserDB.create({ discordId });
    return this.wrap(res) as Promise<User>;
  }

  getUser = (discordId: string) => {
    const res = UserDB.findOne({ discordId }).exec();
    return this.wrap(res) as Promise<User>;
  }

  getAll = () => {
    const res = UserDB.find({}).exec();
    return this.wrap(res) as Promise<User[]>;
  }

  private wrap = async (userModel: Promise<IUserModel | IUserModel[] | null>) => {
    return new Promise<User | User[]>((resolve, reject) => {
      userModel.then((user) => {
        if (user === null) {
          reject("User is null");
        } else {
          if (user instanceof Array) {
            resolve(user.map((u) => new User(u)));
          } else {
            resolve(new User(user));
          }
        }
      }).catch((reason: any) => reject(reason));
    });
  }
}

Object.seal(UserRepository);
